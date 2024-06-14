import InputField from '@/components/forms/inputField'
import { toastError, toastSuccess } from '@/utils/toast'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from 'react-icons/ai'
import { MdPerson } from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom'
import bgLogin from '../assets/bg-login.jpg'

interface FormData {
  username: string
  password: string
}

export default function Login() {
  const [show, setShow] = useState<boolean>(false)
  const token = localStorage.getItem('token')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const navigate = useNavigate()

  const submitHandle = useCallback(
    async (data: FormData) => {
      try {
        if (data) {
          localStorage.setItem('token', 'token')
          toastSuccess('Sign in successfully')
          navigate('/')
        }
      } catch (error) {
        toastError((error as IError).error)
      }
    },
    [navigate]
  )

  if (token) {
    return <Navigate to='/' replace />
  }

  return (
    <section
      id='login'
      className='min-h-screen lg:py-32 flex-center'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.300), rgba(0, 0, 0, 0.300)),url(${bgLogin})`,
        backgroundSize: 'cover'
      }}
    >
      <div className='bg-white bg-opacity-70'>
        <div className='w-full p-4 sm:p-8'>
          <h1 className='text-4xl font-bold tracking-wide text-center text-sky-600'>Chào mừng Bác sĩ</h1>
          <h3 className='mt-3 text-xl tracking-wide text-center text-slate-600'>
            Đăng nhập để tiếp tục quản lý bệnh nhân
          </h3>

          <div className='mt-8'>
            <form onSubmit={handleSubmit(submitHandle)}>
              <div className=''>
                <InputField
                  autoFocus
                  label='Tên đăng nhập'
                  name='username'
                  placeholder='Ví dụ: doctor1'
                  register={register}
                  Icon={MdPerson}
                  option={{
                    required: 'Vui lòng nhập tên đăng nhập',
                    minLength: {
                      value: 6,
                      message: 'Tên đăng nhập phải có ít nhất 6 ký tự'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_.-@]+$/i,
                      message: 'Tên đăng nhập không hợp lệ'
                    }
                  }}
                  error={errors.username?.message}
                />

                <div className='relative mt-7'>
                  <InputField
                    label='Mật khẩu'
                    name='password'
                    type={show ? 'text' : 'password'}
                    placeholder='Ví dụ: 12345678..'
                    register={register}
                    Icon={AiFillUnlock}
                    option={{
                      required: 'Vui lòng nhập mật khẩu',
                      minLength: {
                        value: 8,
                        message: 'Mật khẩu phải có ít nhất 8 ký tự'
                      }
                    }}
                    error={errors.password?.message}
                  />

                  <span onClick={() => setShow(!show)}>
                    {show ? (
                      <AiFillEye className='absolute text-3xl translate-y-5 top-5 right-6 ' />
                    ) : (
                      <AiFillEyeInvisible className='absolute text-3xl translate-y-5 top-5 right-6 ' />
                    )}
                  </span>
                </div>
              </div>
              <button
                type='submit'
                className='w-full py-2 mt-10 text-xl font-bold tracking-wider text-white rounded-2xl bg-sky-600 hover:scale-105 md:py-3'
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
