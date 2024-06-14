import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function useHandleSetUrl() {
  const location = useLocation()
  const navigate = useNavigate()
  const [shouldScroll, setShouldScroll] = useState(false)

  const isValueEmpty = (value: string | number): boolean => value === '' || (Array.isArray(value) && value.length === 0)

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(location.search)

      !isValueEmpty(value) ? params.set(name, String(value)) : params.delete(name)

      return params.toString()
    },
    [location.search]
  )

  const handleSetUrl = useCallback(
    (name: string, value: string | number) => {
      const pathname = location.pathname
      const newSearch = createQueryString(name, value)
      const newUrl = `${pathname}?${newSearch}`
      navigate(`${newUrl}`, { replace: false })
      setShouldScroll(true)
    },
    [navigate, location.pathname, createQueryString]
  )

  useEffect(() => {
    if (shouldScroll) {
      const element = document.getElementById('scroll')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setShouldScroll(false)
    }
  }, [shouldScroll])

  return handleSetUrl
}
