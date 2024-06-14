import useGetTime from '@/components/hooks/getDate'
import { sUser } from '@/utils/fakeData'
import { getCheck, removeToken, saveCheck } from '@/utils/localStoreHandle'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  const isChecked = getCheck()
  const [isCheck, setIsCheck] = useState<boolean>(isChecked)

  const dateTime = useGetTime()

  const handleCheck = (): void => {
    saveCheck(!isCheck)
    setIsCheck(!isCheck)
  }

  const logoutClickHandler = (): void => {
    removeToken()
    navigate('/login')
  }

  return (
    <header id='header' className='fixed top-0 inset-x-0 bg-white z-20 py-3.5 shadow-pop'>
      <div className='container justify-between flex-center-y sm:gap-3 md:gap-5 sm:justify-end'>
        <p className='text-2xl font-bold tracking-wider'>{dateTime}</p>
        <button
          onClick={handleCheck}
          className={`${!isCheck ? 'bg-sky-600' : 'bg-rose-500'} rounded-xl px-4 py-2.5 tracking-wide font-bold text-white hidden sm:block`}
        >
          {!isCheck ? 'Điểm danh' : 'Rời khỏi'}
        </button>

        <Menu as='div' className='relative hidden text-lg sm:flex-center'>
          <h3>
            Xin chào,
            <Menu.Button>
              <span className='ml-1 font-bold cursor-pointer text-sky-600 underline-offset-[6px] underline'>
                Nguyễn Văn A
              </span>
            </Menu.Button>
          </h3>
          <Menu.Items className='flex justify-between pt-4 flex-col absolute -right-2 top-[calc(100%+2rem)] z-[20] w-64  aspect-square cursor-pointer overflow-hidden border rounded-xl border-black bg-white text-center shadow-pop'>
            <div className='px-4 w-full cursor-default break-words pb-2.5'>
              <div className='mx-auto mb-3 rounded-full w-14 ring-offset-base-100 aspect-square shrink-0 shadow-pop ring ring-sky-600 ring-offset-0'>
                <img
                  src={
                    sUser.avatar || 'https://res.cloudinary.com/azurestore/image/upload/v1695735133/avatar_sialno.png'
                  }
                  alt={sUser.name || 'User'}
                  className='object-cover overflow-hidden rounded-full cursor-pointer w-14 aspect-square bg-secondary'
                />
              </div>
              <p className='line-clamp-1'>{sUser.name}</p>
              <p className='line-clamp-1'>{sUser.email} </p>
            </div>

            <Menu.Item as='div' className='w-full hover:scale-105 border-t py-2.5 border-black tracking-wider'>
              <a href='/profile'>Thông tin cá nhân</a>
            </Menu.Item>
            <Menu.Item
              as='button'
              onClick={logoutClickHandler}
              className='w-full tracking-wider hover:scale-105 bg-rose-500 text-white font-bold border-t py-2.5 border-black'
            >
              Đăng xuất
            </Menu.Item>
          </Menu.Items>
        </Menu>
        <div className='sm:hidden'>
          <Popover>
            <Popover.Button className='h-full gap-x-2 rounded-2xl bg-black p-1.5 font-bold text-white shadow-md transition-all'>
              <RiMenu3Fill className='text-3xl' />
            </Popover.Button>
            <Popover.Overlay className='fixed inset-0 bg-black opacity-30' />
            <Transition
              as={Fragment}
              enter='transition-all duration-500'
              leave='transition-all duration-500'
              enterFrom='translate-x-full opacity-0'
              enterTo='translate-x-0 opacity-100'
              leaveFrom='translate-x-0 opacity-100'
              leaveTo='translate-x-full opacity-0'
            >
              <Popover.Panel className='shadow-popup fixed right-0 top-0 z-10 h-full w-full max-w-[230px] overflow-y-auto bg-white'>
                <div className='w-full p-4 mb-4 border-b-2 border-slate-300'>
                  <h3 className='text-xl font-bold text-center'>Xin chào,</h3>
                  <p className='font-bold text-lg  text-center cursor-pointer text-sky-600 underline-offset-[6px] underline line-clamp-1'>
                    Nguyễn Văn A
                  </p>
                </div>
                <a href='/profile' className='block w-full pb-4 text-center border-b-2 border-slate-300'>
                  Thông tin cá nhân
                </a>
                <div className='w-full gap-2 py-4 border-b-2 flex-center-x border-slate-300'>
                  <button
                    onClick={handleCheck}
                    className={`${!isCheck ? 'bg-sky-600' : 'bg-rose-500'} rounded-xl px-2 py-2.5 tracking-wide font-bold text-white`}
                  >
                    {!isCheck ? 'Điểm danh' : 'Rời khỏi'}
                  </button>
                  <button
                    onClick={handleCheck}
                    className={`${!isCheck ? 'bg-sky-600' : 'bg-rose-500'} rounded-xl px-2 py-2.5 tracking-wide font-bold text-white`}
                  >
                    Đăng xuất
                  </button>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </header>
  )
}
