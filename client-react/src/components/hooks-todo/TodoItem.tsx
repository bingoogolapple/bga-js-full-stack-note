import React from 'react'
import { Button, Checkbox } from 'antd'
import { Todo } from '../../types'

interface IProps {
  todo: Todo
  onCheckedChanged: (todo: Todo) => void
  onClickDelete: (todo: Todo) => void
}

//  无状态，木偶组件

// 这种方式拿不到 props.children
// const TodoItem = (props: IProps) => {
// 这种方式能拿到 props.children
// const TodoItem: React.FunctionComponent<IProps> = props => {
const TodoItem: React.FC<IProps> = props => {
  if (!props.todo) {
    return <div>无默认值</div>
  }
  const onCheckedChanged = () => {
    props.onCheckedChanged(props.todo)
  }

  const onClickDelete = () => {
    props.onClickDelete(props.todo)
  }

  return (
    <div
      style={{
        display: 'flex',
        margin: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Checkbox
        style={props.todo.finished ? { textDecoration: 'line-through' } : {}}
        checked={props.todo.finished}
        onChange={onCheckedChanged}
      >
        {props.todo.title}
      </Checkbox>
      <Button danger onClick={onClickDelete}>
        删除
      </Button>
    </div>
  )
}

// 函数式组件可以设置默认属性
// TodoItem.defaultProps = {
//   todo: {
//     id: 1,
//     title: "默认标题",
//     finished: false
//   }
// }

export default TodoItem
