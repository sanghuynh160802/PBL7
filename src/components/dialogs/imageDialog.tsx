import defaultAvatar from '@/assets/default-avatar.png'
import { Dialog } from '@headlessui/react'

interface IProps {
  name: string
  image?: string
  isOpenImage: boolean
  setIsOpenImage: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ImageDialog({ name, image, isOpenImage, setIsOpenImage }: IProps) {
  return (
    <Dialog open={isOpenImage} onClose={() => setIsOpenImage(false)} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex-center '>
        <Dialog.Panel className='mx-auto'>
          <img
            src={image || defaultAvatar}
            className='h-full max-h-[calc(100vh-5rem)] w-full max-w-[calc(100vh-5rem)] object-cover'
            alt={name}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
