import InputField from '@/components/forms/inputField'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsHouseDoor } from 'react-icons/bs'
import { CiCalendar } from 'react-icons/ci'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineEmail, MdPerson } from 'react-icons/md'

interface IProps {
  data?: IPatient
  isUpdate?: boolean
  handle: (data: FormData) => void
  files: (File | IImages)[]
  setFiles: (files: File[]) => void
}

export interface FormData {
  name: string
  phone: string
  email: string
  age: number
  address: string
}

export default function AddForm({ data, files, setFiles, handle, isUpdate }: IProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset: resetFields,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onBlur' })

  useEffect(() => {
    if (data) {
      setValue('name', data.name)
      setValue('age', data.age)
      setValue('phone', data.phone)
      setValue('email', data.email)
      setValue('address', data.address)
    }
  }, [data])

  console.log(data)

  const handleCancel = () => {
    resetFields()
    setFiles([])
  }

  return (
    <form onSubmit={handleSubmit(handle)} className='px-4 space-y-7'>
      <div className='gap-4 space-y-7 sm:space-y-0 lg:space-y-7 xl:space-y-0 sm:flex lg:block xl:flex'>
        <div className='w-full'>
          <InputField
            autoFocus
            label='Họ và tên'
            name='name'
            placeholder='Ví dụ: Nguyễn Văn A'
            register={register}
            Icon={MdPerson}
            option={{
              required: 'Vui lòng nhập tên',
              minLength: {
                value: 6,
                message: 'Tên 6 ký tự'
              }
              // pattern: {
              //   value: /^([\p{L}\p{Mn}\p{Pd}\p{Zs}]+)(?:\s+([\p{L}\p{Mn}\p{Pd}\p{Zs}]+))*$/,
              //   message: 'Tên không hợp lệ'
              // }
            }}
            error={errors.name?.message}
          />
        </div>

        <div className='w-full'>
          <InputField
            name='age'
            type='number'
            label='Tuổi'
            placeholder='Ví dụ: 24'
            register={register}
            Icon={CiCalendar}
            option={{
              required: 'Vui lòng nhập tuổi',
              pattern: {
                value: /^(?:[0-9]|[1-9][0-9]|100|11[0-9]|120)$/,
                message: 'Tuổi không được quá 120'
              }
            }}
            error={errors.age?.message}
          />
        </div>
      </div>

      <div className='gap-4 space-y-7 sm:space-y-0 lg:space-y-7 xl:space-y-0 sm:flex lg:block xl:flex'>
        <div className='w-full'>
          <InputField
            name='phone'
            type='number'
            label='Số điện thoại'
            placeholder='Ví dụ: 0123456789'
            register={register}
            Icon={FiPhone}
            option={{
              required: 'Vui lòng nhập số điện thoại',
              pattern: {
                value: /^0[3|5|7|8|9]{1}[0-9]{8}$/,
                message: 'Số điện thoại không hợp lệ'
              }
            }}
            error={errors.phone?.message}
          />
        </div>

        <div className='w-full'>
          <InputField
            name='email'
            label='Email'
            placeholder='Ví dụ: nguyenvana@gmail.com'
            register={register}
            Icon={MdOutlineEmail}
            option={{
              required: 'Vui lòng nhập email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Email không hợp lệ'
              }
            }}
            error={errors.email?.message}
          />
        </div>
      </div>

      <div className='w-full'>
        <InputField
          name='address'
          label='Địa chỉ'
          placeholder='Ví dụ: 123 Đường ABC, Quận XYZ, Thành phố HCM'
          register={register}
          Icon={BsHouseDoor}
          option={{
            required: 'Vui lòng nhập địa chỉ'
          }}
          error={errors.address?.message}
        />
      </div>

      <div className='gap-5 pt-3 flex-center-y'>
        <button
          type='button'
          onClick={handleCancel}
          className='w-full py-2 text-lg font-bold tracking-wider text-white rounded-2xl bg-rose-500 hover:scale-105 md:py-3'
        >
          Hủy
        </button>
        <button
          type='submit'
          className={`rounded-2xl w-full py-2 text-lg font-bold tracking-wider text-white hover:scale-105 bg-sky-600 md:py-3`}
        >
          {isUpdate ? 'Chỉnh sửa' : 'Thêm'}
        </button>
      </div>
    </form>
  )
}
