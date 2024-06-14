import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number, cb: (value?: T) => Promise<void>, dependencies: any[]) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  console.log(debouncedValue)
  useEffect(() => {
    const handler = setTimeout(async () => {
      setDebouncedValue(value)
      await cb(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, delay])

  return debouncedValue
}
