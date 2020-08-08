import React from 'react'
import './App.css'
import TodoListMobx from './components/mobx-todo'
// import TodoListState from './components/state-todo'
// import TodoListHooks from './components/hooks-todo'
// import HooksDemo from './components/hooks-demo'
import ElectronDemo from './components/electron-demo'

class App extends React.Component {
  render() {
    return (
      <>
        {/* <TodoListState /> */}
        <TodoListMobx />
        {/* <TodoListHooks /> */}
        {/* <HooksDemo /> */}
        <ElectronDemo />
      </>
    )
  }
}

export default App
