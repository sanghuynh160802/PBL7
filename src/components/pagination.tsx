import useHandleSetUrl from '@/utils/useHandleUrl'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

interface IProps {
  page: number
  totalPage: number
}

export default function Pagination({ page, totalPage }: IProps) {
  const handleSetUrl = useHandleSetUrl()
  const itemsPerPage = 5

  let startPage = Math.max(1, +page - Math.floor(itemsPerPage / 2))
  const endPage = Math.min(totalPage, startPage + itemsPerPage - 1)

  if (endPage - startPage + 1 < itemsPerPage) {
    startPage = Math.max(1, totalPage - itemsPerPage + 1)
  }

  return (
    <div
      className={`${
        totalPage ? 'flex flex-col sm:flex-row gap-5 sm:gap-0' : 'hidden'
      } mt-4 items-center justify-between`}
    >
      <div className='flex gap-3'>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2.5 rounded-xl border border-black ${
              +page === item ? 'bg-black text-white' : 'bg-white hover:text-white text-black'
            }`}
            onClick={() => handleSetUrl('page', item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='flex gap-5'>
        <button
          className={`flex-center-y gap-2 bg-black text-white px-4 py-2.5 rounded-xl ${+page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={() => {
            page > 1 && handleSetUrl('page', +page - 1)
          }}
        >
          <FaLongArrowAltLeft className='text-2xl' />
          Trang trước
        </button>
        <button
          className={`flex-center-y gap-2 bg-black text-white px-4 py-2.5 rounded-xl ${+page === totalPage ? 'cursor-not-allowed opacity-50' : ''} `}
          onClick={() => {
            page < totalPage && handleSetUrl('page', +page + 1)
          }}
        >
          Trang tiếp <FaLongArrowAltRight className='text-2xl' />
        </button>
      </div>
    </div>
  )
}
