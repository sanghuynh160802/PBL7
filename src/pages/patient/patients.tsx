import { DeleteWarning, Diagnose } from '@/components/dialogs'
import SelectField from '@/components/forms/selectField'
import { useDebounce } from '@/components/hooks/useDebounce'
import Pagination from '@/components/pagination'
import ListPatients from '@/components/patient/listPatients'
import { resultOptions } from '@/utils/filters'
import { toastError, toastSuccess } from '@/utils/toast'
import useHandleSetUrl from '@/utils/useHandleUrl'
import { useCallback, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoRefresh } from 'react-icons/io5'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function PatientPage() {
  const handleSetUrl = useHandleSetUrl()
  const [searchParams] = useSearchParams()

  const keyword = searchParams.get('keyword') || ''
  const currentPage = searchParams.get('page') || 1

  const [search, setSearch] = useState<string>(keyword)
  const [selected, setSelected] = useState<IResultOptions>(resultOptions[0])
  const [patients, setPatients] = useState<IPatient[]>([])
  const [filterPatients, setFilterPatient] = useState<IPatient[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  const [openDeleteAlert, setOpenDeleteAlert] = useState<IOpenEditUser>({
    id: '',
    name: '',
    open: false
  })

  const [openDiagnose, setOpenDiagnose] = useState<boolean>(false)

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/patients/delete/${id}`)
      if (response.status === 200) {
        setPatients((prev) => prev.filter((patient) => patient._id !== id))
      }
    } catch (error) {
      toastError((error as IError).error)
    }
  }, [])

  // Fetch all patients initially
  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/patients')
        if (Array.isArray(response.data)) {
          setPatients(response.data)
        } else {
          setPatients([])
          toastError('Unexpected data format from API')
        }
      } catch (error) {
        toastError('Error fetching patients')
        setPatients([]) // Ensure patients is an array even if there's an error
      }
    }
    fetchAllPatients()
  }, [])

  useDebounce(
    { search },
    300,
    async () => {
      if (!search) {
        try {
          const response = await axios.get('http://localhost:3001/patients')
          if (Array.isArray(response.data)) {
            setPatients(response.data)
          } else {
            setPatients([])
            toastError('Unexpected data format from API')
          }
          setTotalPages(1) // Adjust based on your pagination
        } catch (error) {
          toastError('Error fetching patients')
          setPatients([]) // Ensure patients is an array even if there's an error
        }
        return
      }

      handleSetUrl('keyword', search)

      try {
        const response = await axios.get(`http://localhost:3001/patients/search/${search}`)
        if (response.data && Array.isArray(response.data.patients)) {
          setPatients(response.data.patients)
          console.log('Fetched patients:', response.data.patients) // Log the fetched patients
        } else {
          setPatients([])
          toastError('Unexpected data format from API')
        }
        setTotalPages(1) // Adjust based on your pagination
      } catch (error) {
        toastError('Error searching patients')
        setPatients([]) // Ensure patients is an array even if there's an error
      }
    },
    [search]
  )

  useEffect(() => {
    let filterPatients = [...patients]

    if (selected.value === 1) {
      filterPatients = filterPatients.filter((i) => i.is_result)
    }

    if (selected.value === 2) {
      filterPatients = filterPatients.filter((i) => !i.is_result)
    }
    setFilterPatient(filterPatients)
  }, [selected, patients])

  return (
    <section id='scroll' className='pt-16 pb-3'>
      <div className='p-4 bg-white rounded-2xl shadow-pop'>
        <h1 className='mb-4 text-2xl font-bold'>Danh sách bệnh nhân</h1>
        <div className='flex flex-col items-center gap-5 mb-4 lg:flex-row'>
          <div className='relative flex-1'>
            <input
              type='text'
              value={search}
              placeholder='Tìm kiếm bệnh nhân'
              className='w-full py-3 pl-4 pr-16 border-2 border-black rounded-xl'
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch className='text-3xl absolute-center-y right-5' />
          </div>
          <div className='flex-col sm:flex-row flex-center-y '>
            <SelectField setSelected={setSelected} selected={selected} resultOptions={resultOptions} />
            <button
              onClick={() => setSelected(resultOptions[0])}
              disabled={selected === resultOptions[0] ? true : false}
              className={`${selected === resultOptions[0] && 'cursor-not-allowed bg-opacity-55'}  flex-shrink-0 gap-3 px-4 py-2 mt-4 font-bold text-white sm:py-3 sm:mt-0 bg-rose-500 hover:scale-105 flex-center rounded-xl`}
            >
              <IoRefresh className='text-2xl' />
              Xóa bộ lọc
            </button>
          </div>
          <div className='flex-col sm:flex-row sm:gap-5 flex-center-y'>
            <button
              onClick={() => setOpenDiagnose(true)}
              className='flex-shrink-0 px-4 py-2 font-bold text-white rounded-xl bg-sky-600 sm:py-3 hover:scale-105'
            >
              Tiến hành chuẩn đoán
            </button>
            <a
              href='/add-patient'
              className='flex-shrink-0 px-4 py-2 mt-4 font-bold text-white rounded-xl sm:mt-0 bg-sky-600 sm:py-3 hover:scale-105'
            >
              Thêm bệnh nhân
            </a>
          </div>
        </div>

        <ListPatients patients={filterPatients} setOpenDeleteAlert={setOpenDeleteAlert} />

        <Diagnose openAlert={openDiagnose} setOpenAlert={() => setOpenDiagnose(!openDiagnose)} />

        <DeleteWarning
          title='bệnh nhân'
          openAlert={openDeleteAlert}
          setOpenAlert={() => setOpenDeleteAlert({ ...openDeleteAlert, open: false })}
          handleDelete={() => handleDelete(openDeleteAlert.id)}
        />

        <Pagination page={+currentPage} totalPage={totalPages} />
      </div>
    </section>
  )
}
