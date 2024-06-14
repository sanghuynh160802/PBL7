import { Dialog } from '@headlessui/react'

interface IProps {
  title: string
  openAlert: IOpenEditUser
  setOpenAlert: (value: boolean) => void
  handleDelete: () => void
}

export default function DeleteWarning({ title, openAlert, setOpenAlert, handleDelete }: IProps) {
  return (
    <div>
      <Dialog open={openAlert.open} onClose={() => setOpenAlert(false)} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center px-2'>
          <Dialog.Panel className='mx-auto w-[38rem] rounded-2xl bg-white p-4 tracking-wide sm:p-6'>
            <Dialog.Title className='mb-2 text-xl font-bold underline underline-offset-8'>
              Bạn có chắc chắn muốn xóa?
            </Dialog.Title>
            <p className='mb-4 leading-8 lg:text-lg'>
              Bạn sẽ không thể hoàn tác hành động này, {title} {''}
              <strong>{openAlert.name}</strong> sẽ bị xóa vĩnh viễn.
            </p>
            <div className='flex float-right gap-2 sm:gap-4'>
              <button
                onClick={() => setOpenAlert(false)}
                className='rounded-2xl border border-black px-4 py-2 font-bold sm:py-2.5'
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setOpenAlert(false)
                  handleDelete()
                }}
                className='rounded-2xl bg-rose-500 px-4 py-2 font-bold text-white sm:py-2.5'
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
