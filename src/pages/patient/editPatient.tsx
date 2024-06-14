import AddForm from '@/components/patient/form/addForm'
import ImageUploadItem from '@/components/patient/form/imageUpload'
import { useCallback, useRef, useState, useEffect } from 'react'
import { BsImages } from 'react-icons/bs'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export interface FormData {
  name: string
  phone: number
  email: string
  age: number
  address: string
}

export default function EditPatientPage() {
  const { id } = useParams<{ id: string }>()

  // State to store patient data
  const [patientData, setPatientData] = useState<FormData | null>(null)
  // State to store patient images
  const [patientImages, setPatientImages] = useState<string[]>([])
  // State to store uploaded files
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/patients/find/${id}`)
        setPatientData(response.data)
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }

    const fetchPatientImages = async () => {
      try {
        const imagesResponse = await axios.get(`http://localhost:3001/images/patient/${id}`)
        const images = imagesResponse.data.map(
          (img: any) => `data:${img.contentType};base64,${arrayBufferToBase64(img.data.data)}`
        )
        setPatientImages(images)
      } catch (error) {
        console.error('Error fetching patient images:', error)
      }
    }

    fetchPatientData()
    fetchPatientImages()
  }, [id])

  const handleUpdate = useCallback(
    async (data: FormData) => {
      await axios.put(`http://localhost:3001/patients/update/${patientData?._id}`, {
        data
      })
    },
    [patientData?._id]
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let pass = true
      const newFiles = Array.from(e.target.files)
      newFiles.forEach((file) => {
        if (!file.type.includes('image')) {
          pass = false
        }
      })
      if (pass) {
        setFiles([...files, ...newFiles])
      }
    }
  }

  const handleRemoveImageUpload = (index: number) => () => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // Function to convert ArrayBuffer to base64 string
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  return (
    <section id='edit-patient' className='pt-16'>
      <div className='relative px-4 bg-white rounded-xl shadow-pop'>
        <a href='/' className='inline-flex items-center gap-3 text-xl absolute-center-y text-sky-600 hover:scale-105'>
          <FaLongArrowAltLeft className='text-3xl' /> Quay lại
        </a>
        <h1 className='py-4 mb-4 text-xl font-bold text-right md:text-center text-sky-600 lg:text-2xl'>
          Cập nhật bệnh nhân
        </h1>
      </div>
      <div className='gap-4 lg:flex'>
        <div className='rounded-xl h-full mb-4 py-4 bg-white shadow-pop lg:mb-0 flex-[2]'>
          <h1 className='px-4 pb-4 mb-2 text-xl font-bold border-b-4 lg:text-2xl border-slate-400'>
            Thông tin cá nhân
          </h1>
          <AddForm isUpdate setFiles={setFiles} files={files} handle={handleUpdate} data={patientData} />
        </div>
        <div className='flex-[3] py-2 bg-white shadow-pop rounded-xl'>
          <input
            type='file'
            className='hidden'
            id='file'
            name='file'
            accept='image/*, video/*'
            multiple
            onChange={handleChangeUpload}
            ref={inputRef}
          />
          <div className='flex items-end justify-between px-4 pb-2 border-b-4 border-slate-400'>
            <h2 className='mb-2 text-xl font-bold lg:text-2xl'>Ảnh đã tải lên</h2>
            <button
              type='button'
              onClick={handleUpload}
              className='gap-4 px-3 py-3 text-white flex-center-y hover:scale-105 rounded-xl bg-sky-600'
            >
              <p>Tải ảnh</p>
              <BsImages className='text-2xl' />
            </button>
          </div>
          <div className='px-4'>
            {/* Display patient images */}
            {patientImages.length ? (
              <ImageUploadItem images={patientImages} onRemove={handleRemoveImageUpload} />
            ) : (
              <p className='mt-5 text-xl'>Không có ảnh nào được đăng tải</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
