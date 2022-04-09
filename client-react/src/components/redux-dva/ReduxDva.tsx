import React from 'react'
import { Button, Card } from 'antd'

import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import Loading from '../loading'
import { CounterActionType, RootState } from './models'

// 把 store 里的数据映射成组件的属性。connect 函数会将整个 dva 的仓库作为参数传递到 mapStateToProps 函数中
const mapStateToProps = ({ counter, loading }: RootState) => {
  return {
    count: counter.count,
    followers: counter.followers,
    loading:
      !!loading.effects[CounterActionType.delayIncrementWithNumType] ||
      !!loading.effects[CounterActionType.getUserInfoType]
  }
}
// 把 store.dispatch 方法挂载到 props 上
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    decrement() {
      return dispatch(CounterActionType.decrementAction())
    },
    increment() {
      return dispatch(CounterActionType.incrementAction())
    },
    delayIncrementWithNum(num: number) {
      return dispatch(CounterActionType.delayIncrementWithNumAction(num))
    },
    getUserInfo() {
      return dispatch(CounterActionType.getUserInfoAction())
    }
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)

interface IProps extends ConnectedProps<typeof connector> {}

class ReduxThunk extends React.Component<IProps> {
  render() {
    return (
      <>
        <Card
          title="Redux-Dva"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Button type="primary" onClick={this.props.decrement}>
                减1
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.delayIncrementWithNum(-10)}
              >
                减10
              </Button>
              <Button type="primary" onClick={this.props.increment}>
                加1
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.delayIncrementWithNum(10)}
              >
                加10
              </Button>
              <Button type="primary" onClick={this.props.getUserInfo}>
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
