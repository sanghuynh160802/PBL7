import { ImagesDialog } from '@/components/dialogs'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

interface Props {
  images: (File | IImages)[]
  onRemove?: (index: number) => () => void
}

export default function ImageUploadItem({ images, onRemove }: Props) {
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const handleOpenImage = (index: number): void => {
    setCurrentImageIndex(index)
    setIsOpenImage(true)
  }

  const handleNextImage = () => {
    currentImageIndex < images.length - 1 && setCurrentImageIndex((prevIndex) => prevIndex + 1)
  }

  const handlePrevImage = () => {
    currentImageIndex && setCurrentImageIndex((prevIndex) => prevIndex - 1)
  }

  const getImageUrl = (image: File | IImages): string => {
    return typeof image === 'string' ? image : image instanceof File ? URL.createObjectURL(image) : image.url
  }

  return (
    <div className='grid grid-cols-2 gap-5 pb-2 mt-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4'>
      {images.map((image, index) => (
        <div key={index} className='relative flex-shrink-0 border-2 border-sky-600 rounded-xl'>
          <div
            onClick={() => handleOpenImage(index)}
            className='h-40 overflow-hidden cursor-pointer rounded-xl image-container'
          >
            <img className='image' src={getImageUrl(image)} alt='demo_img' />
          </div>
          {onRemove && (
            <button
              className='absolute p-1 text-white bg-red-500 rounded-full shadow-md -right-2 -top-2'
              onClick={onRemove(index)}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      ))}

      <ImagesDialog
        images={images}
        isOpenImage={isOpenImage}
        setIsOpenImage={setIsOpenImage}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
        currentImageIndex={currentImageIndex}
      />
    </div>
  )
}
