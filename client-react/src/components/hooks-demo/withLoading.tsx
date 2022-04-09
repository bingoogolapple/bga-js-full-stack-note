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
  return class extends React.Component<
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
        console.log('加载', url)
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

const withFetch = <T, P extends IWithLoadingProps<T>>(url: string) => (
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<
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
        console.log('加载', url)
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

export { withFetch }

export interface IUserInfo {
  name: string
  age: number
}
interface IUserInfoProps extends IWithLoadingProps<IUserInfo> {}
const UserInfo: React.FC<IUserInfoProps> = ({ data }) => {
  return (
    <>
      <div>with name:{data.name}</div>
      <div>with age:{data.age}</div>
    </>
  )
}
export const UserInfoWithFetch = withFetch<IUserInfo, IUserInfoProps>(
  'https://www.baidu.com'
)(UserInfo)

export const UserInfoWithLoading = withLoading<IUserInfo, IUserInfoProps>(
  UserInfo,
  'https://www.baidu.com'
)
