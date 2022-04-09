import { useState, useEffect } from 'react'

// 自定义 Hook，名称必须以 use 开头
const useLoading = <T,>(url: string, deps: any[] = []): [T, boolean] => {
  const [loading, setLoaing] = useState(false)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    console.log(
      '第二个参数 deps 不为 undefined 且里面的值发生变化时，执行 useEffect，包含了 componentDidMount 和 componentWillUpdate'
    )
    setLoaing(true)
    setTimeout(() => {
      console.log('加载', url)
      setData({ name: '李四', age: 40 })
      setLoaing(false)
    }, 1000)
    return () => {
      console.log(
        '第二个参数 deps 不为 undefined 且里面的值发生变化时执行清除，包含了 componentWillUnmount 和 componentWillUpdate'
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [data, loading]
}

export default useLoading
