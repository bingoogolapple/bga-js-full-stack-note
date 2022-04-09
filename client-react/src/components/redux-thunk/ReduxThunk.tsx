import React from 'react'
import { Button, Card } from 'antd'

import { RootState } from './store/reducer'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import { CounterAction } from './store/counter/actionTypes'
// 方式1
import { decrement, increment } from './store/counter/actionCreators'
// 方式2
import * as counterActions from './store/counter/actionCreators'
import { bindActionCreators } from 'redux'
import Loading from '../loading'

// 把 store 里的数据映射成组件的属性。connect 函数会将整个 IStoreState 作为参数传递到 mapStateToProps 函数中
const mapStateToProps = (state: RootState) => {
  return {
    count: state.counter.count,
    followers: state.counter.followers,
    loading: state.counter.loading
  }
}
// 把 store.dispatch 方法挂载到 props 上
const mapDispatchToProps = (dispatch: Dispatch<CounterAction>) => {
  return {
    // increment() {
    //   dispatch({
    //     type: 'increment'
    //   })
    // },
    // decrement() {
    //   dispatch({
    //     type: 'decrement'
    //   })
    // }

    // 方式1
    increment() {
      dispatch(increment())
    },
    decrement() {
      dispatch(decrement())
    },
    // 方式2
    counterActions: bindActionCreators(counterActions, dispatch)
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)

interface IProps extends ConnectedProps<typeof connector> {}

class ReduxThunk extends React.Component<IProps> {
  // connect 时如果不传入 mapDispatchToProps 的话 this.props 上是有 dispatch 方法的，传入 mapDispatchToProps 后就没有 dispatch 方法了
  // increment = () => {
  //   this.props.dispatch({ type: 'increment' })
  // }

  // decrement = () => {
  //   this.props.dispatch({ type: 'decrement' })
  // }

  render() {
    return (
      <>
        <Card
          title="Redux-Thunk"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              {/* 方式1 */}
              <Button type="primary" onClick={this.props.decrement}>
                减1
              </Button>
              {/* 方式2 */}
              <Button
                type="primary"
                onClick={() => this.props.counterActions.decrementWithNum(10)}
              >
                减10
              </Button>
              <Button
                type="primary"
                onClick={this.props.counterActions.increment}
              >
                加1
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.counterActions.incrementWithNum(10)}
              >
                加10
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  this.props.counterActions.delayDecrementWithNum(10)
                }
              >
                延时减10
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.counterActions.getUserInfo()}
              >
                获取个人信息
              </Button>
            </div>
          }
        >
          counter:{this.props.count} followers:{this.props.followers}
        </Card>
        <Loading visible={this.props.loading} />
      </>
    )
  }
}
export default connector(ReduxThunk)
