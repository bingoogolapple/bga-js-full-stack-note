import React from 'react'
import { Button, Card } from 'antd'

import { connect, ConnectedProps } from 'react-redux'
import Loading from '../loading'
import { AppDispatch, RootState } from './store'
import {
  delayIncrementWithNumAction,
  getUserInfoAction,
  decrement as decrementAction,
  increment as incrementAction
} from './store/counter'

const mapStateToProps = ({ counter }: RootState) => {
  return {
    count: counter.count,
    followers: counter.followers,
    loading: counter.loading
  }
}
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    decrement() {
      return dispatch(decrementAction())
    },
    increment() {
      return dispatch(incrementAction(1))
    },
    delayIncrementWithNum(num: number) {
      return dispatch(delayIncrementWithNumAction(num))
    },
    getUserInfo() {
      return dispatch(getUserInfoAction())
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
          title="Redux-Toolkit"
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
