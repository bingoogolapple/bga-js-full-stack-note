import React, { ErrorInfo } from 'react'

interface IErrorBoundaryProps {
  renderError: (errorInfo: ErrorInfo) => React.ReactElement
}
interface IErrorBoundaryState {
  hasError: boolean
  errorInfo?: ErrorInfo
}
export default class CustomErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: Readonly<IErrorBoundaryProps>) {
    super(props)
    this.state = {
      hasError: false,
      errorInfo: undefined
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('捕获到异常', JSON.stringify(error))
    this.setState({ hasError: true, errorInfo: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.renderError(this.state.errorInfo!)}</div>
    }
    return this.props.children
  }
}
