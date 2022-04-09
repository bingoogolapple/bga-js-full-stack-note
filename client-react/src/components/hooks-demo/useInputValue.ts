import { useState, useCallback } from 'react'

// 自定义 Hook，名称必须以 use 开头
const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  const resetValue = useCallback(() => {
    setValue('')
  }, [])

  return {
    value,
    onChange,
    resetValue
  }
}

export default useInputValue
