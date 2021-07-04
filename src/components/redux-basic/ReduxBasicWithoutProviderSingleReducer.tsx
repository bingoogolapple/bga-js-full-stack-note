import React from 'react'
import { Button, Card } from 'antd'

// import store from './store'
import store from './store/counter/store'

/**
 * 演示未被 Provider 包裹，需要单独监听 store 数据变化
 */
export default class ReduxBasicWithoutProviderSingleReducer extends React.Component {
  componentDidMount() {
    // 组件加载完毕，监听数据变化
    store.subscribe(() => {
      console.log('监听到 state 变化，强制刷新当前组件', store.getState())
      this.forceUpdate()
    })
  }

  increment = () => {
    store.dispatch({ type: 'increment' })
  }

  decrement = () => {
    store.dispatch({ type: 'decrement' })
  }

  render() {
    return (
      <>
        <Card
          title="Redux-Basic-NoProvider-SingleReducer"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Button type="primary" onClick={this.decrement}>
                减1
              </Button>
              <Button type="primary" onClick={this.increment}>
                加1
              </Button>
            </div>
          }
        >
          counter:{store.getState().count}
          {/* counter:{store.getState().counter.count}
          score:{store.getState().score.score} */}
        </Card>
      </>
    )
  }
}
