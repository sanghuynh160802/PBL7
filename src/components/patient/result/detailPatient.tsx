import { CiBarcode } from 'react-icons/ci'
import { IoIosTransgender } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'

interface IProps {
  data: IPatient
}

export default function DetailPatient({ data }: IProps) {
  return (
    <section id='detail-patient'>
      <h1 className='px-4 pb-2 mb-2 text-xl font-bold text-center border-b-2 border-slate-400'>Thông tin bệnh nhân</h1>
      <div className='px-4 space-y-3'>
        <div>
          <label htmlFor='name'>Mã bệnh nhân</label>
          <div className='relative'>
            <CiBarcode className='text-2xl absolute-center-y left-4' />
            <input
              disabled
              value={data.id_patient}
              type='text'
              id='name'
              className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
            />
          </div>
        </div>
        <div>
          <label htmlFor='name'>Tên</label>
          <div className='relative'>
            <IoPersonOutline className='text-2xl absolute-center-y left-4' />
            <input
              disabled
              value={data.name}
              type='text'
              id='name'
              className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
            />
          </div>
        </div>

        <div>
          <label htmlFor='age'>Tuổi</label>
          <div className='relative'>
            <LiaBirthdayCakeSolid className='text-2xl absolute-center-y left-4' />
            <input
              disabled
              value={data.age}
              type='text'
              id='name'
              className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
            />
          </div>
        </div>

        <div>
          <label htmlFor='gender'>Giới tính</label>
          <div className='relative'>
            <IoIosTransgender className='text-2xl absolute-center-y left-4' />
            <input
              disabled
              value={data.gender}
              id='gender'
              type='text'
              className='w-full py-3 pr-4 mt-1 border pl-14 border-slate-400 rounded-xl'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
