import React from 'react'
import { Tag } from 'antd'
import TodoViewModel from './TodoViewModel'
import { observer } from 'mobx-react'

interface IProps {
  viewModel: TodoViewModel
}

@observer
class CurrentDate extends React.Component<IProps> {
  render() {
    return (
      <Tag style={{ alignSelf: 'center', marginRight: '50px' }}>
        {this.props.viewModel.currentDate.toLocaleTimeString()}
      </Tag>
    )
  }
}

export default CurrentDate
