import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { sum, print } from '@bga-note/lib-ts-vite'
import pkg from '@bga-note/lib-ts-vite/package.json'
import { Button, Counter } from '@bga-note/lib-react-vite'
// import "@bga-note/lib-react-vite/dist/style.css"

function App() {
  print('main-react-vite 中打印 lib-ts-vite 信息' + sum(2, 3))
  console.log('main-react-vite 中打印 lib-ts-vite 信息', pkg.name, pkg.version)

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className="text-2xl font-bold underline text-blue-400">
        tailwindcss
      </h1>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} />
        </a>
      </div>
      <span>outter:: count is {count}</span>
      <Button onClick={() => setCount((preCount) => preCount + 1)}>增加</Button>
      <Counter />
    </div>
  )
}

export default App
