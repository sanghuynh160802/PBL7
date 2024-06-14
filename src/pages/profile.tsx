import defaultAvatar from '@/assets/default-avatar.png'
import { ImageDialog } from '@/components/dialogs'
import { sUser } from '@/utils/fakeData'
import { useState } from 'react'
import { FiPhone } from 'react-icons/fi'
import { IoPersonOutline } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { TfiEmail } from 'react-icons/tfi'

export default function ProfilePage() {
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false)

  return (
    <section className='mt-20 md:flex md:gap-5'>
      <div className='w-full h-full p-4 mb-5 bg-white border-2 rounded-2xl border-slate-400 md:mb-0 md:w-72'>
        <img
          src={sUser.avatar || defaultAvatar}
          alt={sUser.name || 'User'}
          className='object-cover mx-auto transition duration-300 ease-in-out rounded-full shadow-2xl cursor-pointer w-72 aspect-square hover:scale-105 hover:border-4 hover:border-primary'
          onClick={() => setIsOpenImage(true)}
        />

        <ImageDialog name={sUser.name} image={sUser.avatar} isOpenImage={isOpenImage} setIsOpenImage={setIsOpenImage} />
      </div>
      <div className='flex-1 p-4 bg-white border-2 rounded-2xl border-slate-400'>
        <h1 className='mb-2 text-2xl font-bold'>Thông tin cá nhân</h1>
        <div className='grid grid-cols-1 gap-4 lg:gap-7 lg:grid-cols-2'>
          <div>
            <label htmlFor='age'>Tên</label>
            <div className='relative'>
              <input
                disabled
                value={sUser.name}
                type='text'
                id='name'
                placeholder='Ví dụ: John Doe'
                className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
              />
              <IoPersonOutline className='text-2xl absolute-center-y left-4' />
            </div>
          </div>

          <div>
            <label htmlFor='age'>Tuổi</label>
            <div className='relative'>
              <input
                disabled
                value={sUser.age}
                type='text'
                id='name'
                placeholder='Ví dụ: 25'
                className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
              />
              <LiaBirthdayCakeSolid className='text-2xl absolute-center-y left-4' />
            </div>
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <div className='relative'>
              <input
                disabled
                value={sUser.email}
                id='email'
                type='text'
                placeholder='Ví dụ: john@gmail.com'
                className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
              />
              <TfiEmail className='absolute text-2xl top-4 left-4' />
            </div>
          </div>
          <div>
            <label htmlFor='phone'>Số điện thoại</label>
            <div className='relative'>
              <input
                disabled
                value={sUser.phone}
                id='phone'
                type='number'
                placeholder='Ví dụ: 0123456789'
                className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
              />
              <FiPhone className='text-2xl absolute-center-y left-4' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
