import React, { useState } from 'react'
import { Button } from '../Button'
import reactLogo from '../../assets/react.svg'
import { sum, print } from '@bga-note/lib-ts-vite'
import pkg from '@bga-note/lib-ts-vite/package.json'

export const Counter: React.FC = () => {
  print('lib-react-vite 中打印 lib-ts-vite 信息' + sum(2, 3))
  console.log('lib-react-vite 中打印 lib-ts-vite 信息', pkg.name, pkg.version)
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1 className="text-2xl font-bold underline text-blue-400">
        tailwindcss
      </h1>
      <img src={reactLogo} />
      <span>inner:: count is {count}</span>
      <Button onClick={() => setCount((preCount) => preCount + 1)}>增加</Button>
    </div>
  )
}
