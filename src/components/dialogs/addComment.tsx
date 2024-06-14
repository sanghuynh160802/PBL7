import { Dialog } from '@headlessui/react';

interface IProps {
  comment: string;
  setComment: (value: string) => void;
  openComment: boolean;
  setOpenComment: () => void;
}

export default function AddComment({ openComment, setOpenComment, setComment, comment }: IProps) {
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Dialog open={openComment} onClose={() => setOpenComment()} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center px-2'>
          <Dialog.Panel className='mx-auto w-[38rem] rounded-2xl bg-white p-4 tracking-wide sm:p-6'>
            <Dialog.Title className='mb-2 text-xl font-bold'>Hãy nhận xét bệnh lý của bệnh nhân</Dialog.Title>

            <textarea
              value={comment}
              rows={6}
              onChange={handleCommentChange}
              className='w-full py-2.5 px-4 mb-4 border border-black rounded-xl'
              placeholder='Ví dụ: Bệnh nhân mắc bệnh gì? Cần chú ý điều gì? '
            />
            <div className='flex float-right gap-2 sm:gap-4'>
              <button
                onClick={() => setOpenComment()}
                className='rounded-2xl border border-black px-4 py-2 font-bold sm:py-2.5'
              >
                Hủy
              </button>
              <button
                disabled={!comment}
                onClick={() => setOpenComment()}
                className={`
                  ${!comment && 'pointer-events-none bg-opacity-50'} rounded-2xl bg-rose-500 px-4 py-2 font-bold text-white sm:py-2.5`}
              >
                Xác nhận
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
