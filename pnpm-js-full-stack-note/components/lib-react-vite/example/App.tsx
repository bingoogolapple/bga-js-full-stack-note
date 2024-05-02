import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Button, Counter } from '../src'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <img src={reactLogo} />
      <span>outter:: count is {count}</span>
      <Button onClick={() => setCount((preCount) => preCount + 1)}>增加</Button>
      <Counter />
    </div>
  )
}

export default App
