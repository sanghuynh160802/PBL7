import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IProps {
  name?: string
  label?: string
  type?: string
  placeholder: string
  disabled?: boolean
  register: UseFormRegister<any>
  option?: RegisterOptions
  error?: string
  defaultValue?: string
  readOnly?: boolean
  autoFocus?: boolean
  Icon: React.ElementType
}

export default function InputField({
  name,
  Icon,
  autoFocus,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  register,
  defaultValue,
  option,
  error,
  readOnly
}: IProps) {
  return (
    <div className={`${error ? 'h-[80px]' : 'h-[65px]'}`}>
      <p className='mb-1.5'>{label}</p>
      <div className='relative flex flex-col'>
        {Icon && <Icon className={`absolute-center-y left-4 text-3xl`} />}
        <input
          autoFocus={autoFocus}
          id={label}
          className={`w-full rounded-2xl border-2 border-gray-300 py-3 pl-14 pr-4 outline-none  focus:border-2 focus:border-sky-600  ${
            error && 'border-rose-500'
          }  ${disabled && 'bg-gray-100'} `}
          type={type}
          readOnly={readOnly}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          {...(name && { ...register(name, { ...option }) })}
        />
      </div>
      {error && <p className='pr-5 font-medium text-right text-rose-500'>{error}</p>}
    </div>
  )
}
