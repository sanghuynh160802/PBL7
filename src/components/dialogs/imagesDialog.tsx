import { Dialog } from '@headlessui/react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

interface IProps {
  images: (File | IImages)[]
  isOpenImage: boolean
  setIsOpenImage: React.Dispatch<React.SetStateAction<boolean>>
  currentImageIndex: number
  handlePrevImage: () => void
  handleNextImage: () => void
}

export default function ImagesDialog({
  images,
  isOpenImage,
  setIsOpenImage,
  handlePrevImage,
  handleNextImage,
  currentImageIndex
}: IProps) {
  const generateImage = (image: File | IImages) => {
    return typeof image === 'string' ? image : image instanceof File ? URL.createObjectURL(image) : image.url
  }

  return (
    <Dialog open={isOpenImage} onClose={() => setIsOpenImage(false)} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex-center '>
        <Dialog.Panel className='mx-auto'>
          {currentImageIndex > 0 && (
            <button
              onClick={handlePrevImage}
              className='absolute inset-y-0 left-0 w-20 shadow-2xl flex-center bg-black/30 hover:bg-black/20 group'
            >
              <div className='p-2 rounded-full bg-slate-300 group-hover:bg-white z-[1]'>
                <MdOutlineKeyboardArrowLeft className='text-3xl' />
              </div>
            </button>
          )}
          <img
            src={generateImage(images[currentImageIndex] as File | IImages)}
            className='h-full max-h-[calc(100vh-5rem)] w-full max-w-[calc(100vh-5rem)] object-cover'
            alt={images[currentImageIndex] instanceof File ? 'demo_img' : images[currentImageIndex].title}
          />
          {currentImageIndex < images.length - 1 && (
            <button
              onClick={handleNextImage}
              className='absolute inset-y-0 right-0 w-20 shadow-2xl flex-center bg-black/30 hover:bg-black/20 group'
            >
              <div className='p-2 rounded-full bg-slate-300 group-hover:bg-white z-[1]'>
                <MdOutlineKeyboardArrowRight className='text-3xl' />
              </div>
            </button>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
