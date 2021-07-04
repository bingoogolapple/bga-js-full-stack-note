import React from 'react'
import { Button, Card } from 'antd'

import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import * as counterActions from './store/counter/actionCreators'
import * as scoreActions from './store/score/actionCreators'
import { bindActionCreators } from 'redux'
import { RootState } from './store/reducer'

// 把 store 里的数据映射成组件的属性。connect 函数会将整个 IStoreState 作为参数传递到 mapStateToProps 函数中
const mapStateToProps = (state: RootState) => {
  return {
    count: state.counter.count,
    score: state.score.score
  }
}
// 把 store.dispatch 方法挂载到 props 上
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    counterActions: bindActionCreators(counterActions, dispatch),
    scoreActions: bindActionCreators(scoreActions, dispatch)
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)

interface IProps extends ConnectedProps<typeof connector> {}

class ReduxBasicWithProviderMultiReducer extends React.Component<IProps> {
  render() {
    return (
      <>
        <Card
          title="Redux-Basic-Provider-SingleReducer"
          extra={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Button
                type="primary"
                onClick={this.props.counterActions.decrement}
              >
                counter减1
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.counterActions.decrementWithNum(10)}
              >
                counter减10
              </Button>
              <Button
                type="primary"
                onClick={this.props.counterActions.increment}
              >
                counter加1
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.counterActions.incrementWithNum(10)}
              >
                counter加10
              </Button>
              <Button
                type="primary"
                onClick={() => this.props.scoreActions.incrementWithNum(10)}
              >
                score加10
              </Button>
            </div>
          }
        >
          counter:{this.props.count} score:{this.props.score}
        </Card>
      </>
    )
  }
}
export default connector(ReduxBasicWithProviderMultiReducer)
