import { useEffect, useState } from 'react'

function useGetTime() {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return `${dateTime.toLocaleTimeString()} - ${dateTime.toLocaleDateString('vi-VN')}`
}

export default useGetTime
