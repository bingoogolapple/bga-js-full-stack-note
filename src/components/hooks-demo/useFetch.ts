import { useState, useEffect } from 'react'

// 自定义 Hook，名称必须以 use 开头
const useFetch = <T>(url: string): [T, boolean] => {
  const [loading, setLoaing] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      setLoaing(true)
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/vnd.github.cloak-preview'
          })
        })
        const data = await response.json()
        console.log('获取成功', data)
        setData(data) // 每调用一次都会触发一次 render
      } catch (error) {
        console.error('获取失败', error)
      } finally {
        console.log('关闭加载中对话框')
        setLoaing(false) // 每调用一次都会触发一次 render
      }
    })()
  }, [url])

  return [data, loading]
}

export default useFetch
