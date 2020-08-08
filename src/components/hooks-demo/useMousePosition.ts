import { useState, useEffect } from 'react'

// 自定义 Hook，名称必须以 use 开头
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log(
      `useMousePosition 第二个参数传 [] 时只会在组件第一次加载完成时执行 useEffect，类似于 componentDidMount`
    )
    let updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener('click', updateMouse)
    return () => {
      console.log(
        `useMousePosition 第二个参数传 [] 时只会在组件卸载时执行清除，类似于 componentWillUnmount`
      )
      document.removeEventListener('click', updateMouse)
    }
  }, [])

  return position
}

export default useMousePosition
