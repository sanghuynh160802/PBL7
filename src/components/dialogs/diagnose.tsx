import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  openAlert: boolean
  setOpenAlert: () => void
}

export default function Diagnose({ openAlert, setOpenAlert }: IProps) {
  const navigate = useNavigate()
  const [id, setId] = useState<string>('')

  const handleConfirm = () => {
    setOpenAlert()
    navigate(`/diagnose-patient/${id}`)
  }

  return (
    <div>
      <Dialog open={openAlert} onClose={() => setOpenAlert()} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center px-2'>
          <Dialog.Panel className='mx-auto w-[38rem] rounded-2xl bg-white p-4 tracking-wide sm:p-6'>
            <Dialog.Title className='mb-2 text-xl font-bold underline underline-offset-8'>
              Tiến hành chuẩn đoán
            </Dialog.Title>
            <p className='mb-4 leading-8 lg:text-lg'>Bạn vui lòng nhập mã bênh nhân để tiếp tục tiến hành chuẩn đoán</p>

            <input
              type='number'
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              className='w-full py-2.5 px-4 mb-4 border border-black rounded-xl'
              placeholder='Ví dụ: 123456'
            />
            <div className='flex float-right gap-2 sm:gap-4'>
              <button
                onClick={() => setOpenAlert()}
                className='rounded-2xl border border-black px-4 py-2 font-bold sm:py-2.5'
              >
                Hủy
              </button>
              <button
                disabled={id.length !== 6}
                onClick={() => handleConfirm()}
                className={`
                  ${id.length !== 6 && 'bg-opacity-50'} rounded-2xl bg-rose-500 px-4 py-2 font-bold text-white sm:py-2.5`}
              >
                Xác nhận
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
