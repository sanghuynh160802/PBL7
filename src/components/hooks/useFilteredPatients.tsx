import { useEffect, useState } from 'react'

export default function useFilteredPatients(selected: IResultOptions, patients: IResFormat<IPatient>) {
  const [resultPatients, setResultPatients] = useState<IResFormat<IPatient>>(patients)

  useEffect(() => {
    const result = patients.data
    if (Number(selected.value) === 0) {
      setResultPatients(patients)
    }

    if (Number(selected.value) === 1) {
      setResultPatients((prevState) => ({
        ...prevState,
        totalPages: Math.round(result.filter((item) => item.haveResult).length / 10),
        data: result.filter((item) => item.haveResult)
      }))
    }

    if (Number(selected.value) === 2) {
      setResultPatients((prevState) => ({
        ...prevState,
        totalPages: Math.round(result.filter((item) => item.haveResult).length / 10),
        data: result.filter((item) => !item.haveResult)
      }))
    }
  }, [patients, resultPatients.data, selected])

  return resultPatients
}
