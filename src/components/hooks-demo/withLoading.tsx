import React from 'react'

export interface IWithLoadingProps<T> {
  data: T
}
interface IWithLoadingState {
  data: any
  loading: boolean
}
// 高阶组件就是一个函数，接收一个组件作为参数，返回一个新的组件
const withLoading = <T, P extends IWithLoadingProps<T>>(
  WrappedComponent: React.ComponentType<P>,
  url: string
) => {
  return class LoadingComponent extends React.Component<
    Partial<IWithLoadingProps<T>>,
    IWithLoadingState
  > {
    constructor(props: IWithLoadingProps<T>) {
      super(props)
      this.state = {
        data: null,
        loading: false
      }
    }

    componentDidMount() {
      this.setState({ loading: true })

      setTimeout(() => {
        this.setState({ loading: false, data: { name: '张三', age: 30 } })
      }, 1000)
    }

    render() {
      const { data, loading } = this.state
      return (
        <>
          {loading || !data ? (
            <div>数据加载中</div>
          ) : (
            <WrappedComponent {...(this.props as P)} data={data} />
          )}
        </>
      )
    }
  }
}
export default withLoading
