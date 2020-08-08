import React from 'react'
import { Input } from 'antd'
import TodoViewModel from './TodoViewModel'
import { observer } from 'mobx-react'
import { trace } from 'mobx'

interface IProps {
  viewModel: TodoViewModel
}

@observer
class SearchTodo extends React.Component<IProps> {
  _updateKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.viewModel.updateKeyword(e.target.value)
  }

  render() {
    trace()

    return (
      <Input
        placeholder="根据代办标题进行过滤"
        allowClear
        value={this.props.viewModel.keyword}
        onChange={this._updateKeyword}
        style={{ marginRight: '70px' }}
      />
    )
  }
}

export default SearchTodo
