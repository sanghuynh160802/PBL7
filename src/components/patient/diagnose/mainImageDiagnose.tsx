import defaultAvatar from '@/assets/default-avatar.png';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';
import { IoAddOutline } from 'react-icons/io5';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePrediction } from '../../../pages/patient/PredictionContext';

interface IProps {
  grayImages?: string[];
  normalImages?: string[];
  imageIds?: string[];
  id: string;
  setCurrentImageId: (id: string | null) => void;
}

export default function MainImageDiagnose({
  grayImages,
  normalImages,
  imageIds,
  id,
  setCurrentImageId
}: IProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [uploadedNormalImages, setUploadedNormalImages] = useState<File[]>([]);
  const [uploadedGrayImages, setUploadedGrayImages] = useState<File[]>([]);
  const [normalImageIds, setNormalImageIds] = useState<string[]>(imageIds || []);
  const [grayImageIds, setGrayImageIds] = useState<string[]>(imageIds || []);
  const { setPrediction, fetchPredictionResults, setPredictionResults } = usePrediction();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentType, setCurrentType] = useState<string>('UFI');

  useEffect(() => {
    if (grayImages && normalImages && imageIds) {
      const normalIds = normalImages.map((_, index) => imageIds[index]);
      const grayIds = grayImages.map((_, index) => imageIds[normalImages.length + index]);
      setNormalImageIds(normalIds);
      setGrayImageIds(grayIds);
      setCurrentImageId(normalIds[0] || grayIds[0] || null);
    }
  }, [grayImages, normalImages, imageIds, setCurrentImageId]);

  useEffect(() => {
    if (currentType === 'UFI' && normalImageIds[currentImageIndex]) {
      setCurrentImageId(normalImageIds[currentImageIndex]);
    } else if (currentType === 'CFI' && grayImageIds[currentImageIndex]) {
      setCurrentImageId(grayImageIds[currentImageIndex]);
    }
  }, [currentImageIndex, normalImageIds, grayImageIds, setCurrentImageId, currentType]);

  const handleSwitImgType = (type: string) => {
    setCurrentType(type);
    setCurrentImageIndex(0); // Reset current image index when switching image type
  };

  const handleUpload = async () => {
    try {
      if (fileInputRef.current && fileInputRef.current.files) {
        const formData = new FormData();
        Array.from(fileInputRef.current.files).forEach((file) => {
          formData.append('id_patient', id); // Append id_patient
          formData.append('image_eyes', file);
        });

        // Conditionally append isGrayImage parameter if currentType is 'CFI'
        if (currentType === 'CFI') {
          formData.append('isGrayImage', 'true');
        }

        const response = await axios.post('http://localhost:3001/images/upload', formData);

        console.log('Server response:', response.data); // Log the server response for debugging

        if (response.status >= 200 && response.status < 300) {
          toast.success('Image(s) uploaded successfully');
          const newImageId = response.data._id; // Assuming the response contains the new image ID

          if (newImageId) {
            if (currentType === 'UFI') {
              setNormalImageIds((prev) => [...prev, newImageId]);
              setCurrentImageIndex((normalImages?.length ?? 0) + 1 - 1);
            } else {
              setGrayImageIds((prev) => [...prev, newImageId]);
              setCurrentImageIndex((grayImages?.length ?? 0) + 1 - 1);
            }
          } else {
            toast.error('Invalid response format: _id is missing');
          }
        } else {
          toast.error('Failed to upload image(s)');
        }
      } else {
        toast.error('Please select image(s) to upload');
      }
    } catch (error) {
      console.error('Error uploading image(s):', error);
      toast.error('Error uploading image(s)');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentType === 'UFI' && normalImageIds[currentImageIndex]) {
          await fetchPredictionResults(normalImageIds[currentImageIndex]);
        } else if (currentType === 'CFI' && grayImageIds[currentImageIndex]) {
          await fetchPredictionResults(grayImageIds[currentImageIndex]);
        }
      } catch (error) {
        console.error('Error fetching prediction results:', error);
      }
    };

    fetchData();
  }, [currentImageIndex, normalImageIds, grayImageIds, fetchPredictionResults, currentType]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (currentType === 'UFI') {
        setUploadedNormalImages((prevImages) => [...prevImages, ...filesArray]);
        const newImageLength = normalImages?.length || 0;
        setCurrentImageIndex(newImageLength + filesArray.length - 1);
      } else {
        setUploadedGrayImages((prevImages) => [...prevImages, ...filesArray]);
        const newImageLength = grayImages?.length || 0;
        setCurrentImageIndex(newImageLength + filesArray.length - 1);
      }
      handleUpload();
    }
  };

  const handlePredict = async () => {
    try {
      let formData = new FormData();
      const imageArray = currentType === 'UFI' ? normalImages : grayImages;
      const uploadedImages = currentType === 'UFI' ? uploadedNormalImages : uploadedGrayImages;

      if (uploadedImages.length > 0) {
        formData.append('image', uploadedImages[currentImageIndex - (imageArray?.length || 0)]);
      } else if (imageArray?.length) {
        const imageId = currentType === 'UFI' ? normalImageIds[currentImageIndex] : grayImageIds[currentImageIndex];
        const response = await axios.get(imageArray[currentImageIndex], { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        formData.append('image', blob, imageId);
      } else {
        toast.error('Please select an image to predict');
        return;
      }

      const response = await axios.post('http://localhost:5000/predict_retinopathy', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const predictionValues = response.data.prediction[0];
      const categories = ['Mild', 'Moderate', 'No_DR', 'Proliferate_DR', 'Severe'];
      const maxIndex = predictionValues.indexOf(Math.max(...predictionValues));
      const diabeticRetinopathy = categories[maxIndex];

      const postResponse = await axios.post('http://localhost:3001/predictions/create', {
        id_image: currentType === 'UFI' ? normalImageIds[currentImageIndex] : grayImageIds[currentImageIndex],
        mild_value: predictionValues[0],
        moderate_value: predictionValues[1],
        noDR_value: predictionValues[2],
        proliferateDR_value: predictionValues[3],
        severe_value: predictionValues[4],
        diabetic_Retinopathy: diabeticRetinopathy
      });

      console.log(postResponse);

      setPrediction(JSON.stringify(response.data.prediction));
      setPredictionResults([]);

      if (currentType === 'UFI' && normalImageIds[currentImageIndex]) {
        await fetchPredictionResults(normalImageIds[currentImageIndex]);
      } else if (currentType === 'CFI' && grayImageIds[currentImageIndex]) {
        await fetchPredictionResults(grayImageIds[currentImageIndex]);
      }

      toast.success('Prediction successful');
    } catch (error) {
      console.error('Error predicting image:', error);
      toast.error('Error predicting image');
    }
  };

  return (
    <section id='main-image' className='h-full gap-2 md:flex'>
      <ToastContainer />
      <div className='flex w-full gap-2 mb-4 overflow-auto md:block md:w-40 md:mb-0'>
        {currentType === 'CFI' &&
          grayImages?.map((image, index) => (
            <div key={index} className='flex-shrink-0 image-container w-28 aspect-square'>
              <img
                onClick={() => setCurrentImageIndex(index)}
                src={image || defaultAvatar}
                alt=''
                className={`mb-2 image rounded-xl ${currentImageIndex === index && 'border-4 border-sky-600'}`}
              />
              <p
                className={`
                ${currentImageIndex === index ? 'bottom-1 w-[calc(100%-7.5px)] rounded-b-lg' : 'bottom-0 w-full rounded-b-xl'}
                text-center text-white bg-black bg-opacity-50 line-clamp-1 absolute-center-x`}
              >
                {`Image ${index + 1}`}
              </p>
            </div>
          ))}

        {currentType === 'UFI' &&
          normalImages?.map((image, index) => (
            <div key={index} className='flex-shrink-0 image-container w-28 aspect-square'>
              <img
                onClick={() => setCurrentImageIndex(index)}
                src={image || defaultAvatar}
                alt=''
                className={`mb-2 image rounded-xl ${currentImageIndex === index && 'border-4 border-sky-600'}`}
              />
              <p
                className={`
                ${currentImageIndex === index ? 'bottom-1 w-[calc(100%-7.5px)] rounded-b-lg' : 'bottom-0 w-full rounded-b-xl'}
                text-center text-white bg-black bg-opacity-50 line-clamp-1 absolute-center-x`}
              >
                {`Image ${index + 1}`}
              </p>
            </div>
          ))}

        {currentType === 'UFI' && uploadedNormalImages.map((file, index) => (
          <div key={index} className='flex-shrink-0 image-container w-28 aspect-square'>
            <img
              onClick={() => setCurrentImageIndex((normalImages?.length ?? 0) + index)}
              src={URL.createObjectURL(file)}
              alt=''
              className={`mb-2 image rounded-xl ${currentImageIndex === ((normalImages?.length ?? 0) + index) && 'border-4 border-sky-600'}`}
            />
            <p
              className={`
                ${currentImageIndex === ((normalImages?.length ?? 0) + index) ? 'bottom-1 w-[calc(100%-7.5px)] rounded-b-lg' : 'bottom-0 w-full rounded-b-xl'}
                text-center text-white bg-black bg-opacity-50 line-clamp-1 absolute-center-x`}
            >
              {`Image ${(normalImages?.length || 0) + index + 1}`}
            </p>
          </div>
        ))}

        {currentType === 'CFI' && uploadedGrayImages.map((file, index) => (
          <div key={index} className='flex-shrink-0 image-container w-28 aspect-square'>
            <img
              onClick={() => setCurrentImageIndex((grayImages?.length ?? 0) + index)}
              src={URL.createObjectURL(file)}
              alt=''
              className={`mb-2 image rounded-xl ${currentImageIndex === ((grayImages?.length ?? 0) + index) && 'border-4 border-sky-600'}`}
            />
            <p
              className={`
                ${currentImageIndex === ((grayImages?.length ?? 0) + index) ? 'bottom-1 w-[calc(100%-7.5px)] rounded-b-lg' : 'bottom-0 w-full rounded-b-xl'}
                text-center text-white bg-black bg-opacity-50 line-clamp-1 absolute-center-x`}
            >
              {`Image ${(grayImages?.length || 0) + index + 1}`}
            </p>
          </div>
        ))}

        <div className='flex-shrink-0 image-container w-28 aspect-square'>
          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileSelect}
            className='hidden'
            id='upload-image'
            ref={fileInputRef}
          />
          <label htmlFor='upload-image' className='mb-2 image rounded-xl cursor-pointer'>
            <span className='flex items-center justify-center w-full h-full'>
              <IoAddOutline className='text-4xl text-gray-500' />
            </span>
          </label>
          <p
            className='text-center text-white bottom-0 w-full rounded-b-xl bg-black bg-opacity-50 line-clamp-1 absolute-center-x'
            onClick={handleUpload}
          >
            Tải lên
          </p>
        </div>
      </div>

      <div className='w-full'>
        <div className='relative bg-black rounded-lg flex-center'>
          <TransformWrapper initialScale={1}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className='z-10 bg-white border rounded-lg opacity-80 border-l-slate-400 absolute-center-x top-6'>
                  <button className='px-2' onClick={() => zoomIn()}>
                    <IoAddOutline className='text-2xl' />
                  </button>
                  <button className='px-2 py-2 border-x border-slate-400' onClick={() => zoomOut()}>
                    <AiOutlineMinus className='text-2xl' />
                  </button>
                  <button className='px-2' onClick={() => resetTransform()}>
                    <GrPowerReset className='text-2xl' />
                  </button>
                </div>
                <TransformComponent>
                  <div className='bg-white w-[19.5rem] md:w-[27.5rem] h-[19.5rem] md:h-[27.5rem] image-container'>
                    <img
                      src={
                        currentType === 'UFI'
                          ? (uploadedNormalImages.length > 0 && currentImageIndex >= (normalImages?.length || 0))
                            ? URL.createObjectURL(uploadedNormalImages[currentImageIndex - (normalImages?.length || 0)])
                            : normalImages?.[currentImageIndex] || defaultAvatar
                          : (uploadedGrayImages.length > 0 && currentImageIndex >= (grayImages?.length || 0))
                            ? URL.createObjectURL(uploadedGrayImages[currentImageIndex - (grayImages?.length || 0)])
                            : grayImages?.[currentImageIndex] || defaultAvatar
                      }
                      alt=''
                      className='object-cover w-full h-full mx-auto'
                    />
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
        <div className='mt-4 flex-center-x relative'>
          <button
            className='px-4 py-2 h-full font-bold text-white flex-shrink-0 rounded-lg bg-sky-600 sm:py-2.5 hover:scale-105'
            onClick={handlePredict}
          >
            Chuẩn đoán
          </button>
          <div className='absolute right-0 border-2 inset-y-0 border border-slate-400 rounded-xl flex-center-y overflow-hidden'>
            <button
              onClick={() => handleSwitImgType('UFI')}
              className={`${currentType === 'UFI' ? 'bg-slate-500 text-white' : 'bg-slate-300'} px-4 py-2 h-full rounded-l-lg `}
            >
              UFI
            </button>
            <div className='h-full w-0.5 bg-slate-400' />
            <button
              onClick={() => handleSwitImgType('CFI')}
              className={`${currentType === 'CFI' ? 'bg-slate-500 text-white' : 'bg-slate-300'} px-4 py-2 h-full rounded-r-lg`}
            >
              CFI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}











