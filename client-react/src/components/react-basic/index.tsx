import React, { ErrorInfo } from 'react'
import CustomErrorBoundary from './CustomErrorBoundary'
import { Alert } from 'antd'
const { ErrorBoundary } = Alert

/**
 * React.Component 不会对 props 进行比较，如果要优化渲染可以重写 shouldComponentUpdate 方法
 * React.PureComponent 会对 props 进行浅比较，如果要进行深比较可以重写 shouldComponentUpdate 方法
 *
 * shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any):boolean {
 *   return this.props.name !== nextProps.name
 * }
 */
export default class ReactBasic extends React.Component {
  render() {
    return (
      <div>
        <h2>正常展示部分</h2>
        <CustomErrorBoundary
          renderError={(errorInfo: ErrorInfo) => {
            return (
              <div>
                <h3>以下组件存在错误</h3>
                <h4>{errorInfo.componentStack}</h4>
              </div>
            )
          }}
        >
          <TestErrorUncle />
          <TestErrorParent />
        </CustomErrorBoundary>

        <ErrorBoundary>
          <TestErrorUncle />
          <TestErrorParent />
        </ErrorBoundary>
      </div>
    )
  }
}

const TestErrorUncle: React.FC = () => {
  return (
    <div>
      <h4>TestErrorUncle 错误节点的叔叔</h4>
    </div>
  )
}
const TestErrorParent: React.FC = () => {
  return (
    <div>
      <h4>TestErrorParent 错误节点的爸爸</h4>
      <TestErrorBrother />
      <TestError />
    </div>
  )
}

const TestErrorBrother: React.FC = () => {
  return (
    <div>
      <h4>错误节点的兄弟节点</h4>
    </div>
  )
}
const TestError: React.FC = () => {
  let a: any = {}
  return <h4>测试异常组件 {a.xx.yy} </h4>
}
