import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, Card, Modal, Input, message, Empty, Tag } from 'antd'
import { Todo } from '../../types'

import TodoItem from './TodoItem'
import Loading from '../loading'

function mockHttpRequest<T>(timeout: number, handleData: () => T) {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      const result = handleData()
      resolve(result)
    }, timeout)
  })
}

const TodoListHooks: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [currentTodoList, setCurrentTodoList] = useState<Todo[]>([])
  const [addTodoDialogVisible, setAddTodoDialogVisible] = useState(false)
  const [deleteTodo, setDeleteTodo] = useState<Todo>()
  const [addTitle, setAddTitle] = useState('')
  const [keyword, setKeyword] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(false)

  // 定时器
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    })
    return () => {
      clearInterval(timer)
    }
  }, [])

  // loadData
  useEffect(() => {
    setLoading(true)
    mockHttpRequest(1000, () => {
      return [1, 2, 3, 4, 5].map(index => ({
        id: Math.random() * 100000000,
        title: `默认标题${index}`,
        finished: false
      }))
    })
      .then(newTodoList => {
        setTodoList(newTodoList)
        setCurrentTodoList(newTodoList)
        setLoading(false)
      })
      .catch(e => {
        console.log('获取代办列表失败', e)
        setLoading(false)
      })
  }, [])

  const showAddTodoDialog = useCallback(() => {
    setAddTodoDialogVisible(true)
  }, [])

  const hideAddTodoDialog = useCallback(() => {
    setAddTodoDialogVisible(false)
    setAddTitle('')
  }, [])

  const showConfirmDeleteDialog = useCallback((todo: Todo) => {
    setDeleteTodo(todo)
  }, [])

  const getNewCurrentTodoList = useCallback(
    (keyword: string, todoList: Todo[]) => {
      console.log('getNewCurrentTodoList')
      let newCurrentTodoList: Todo[]
      if (keyword) {
        newCurrentTodoList = todoList.filter(
          item => item.title.indexOf(keyword) !== -1
        )
      } else {
        newCurrentTodoList = todoList
      }
      return newCurrentTodoList
    },
    []
  )

  const handleAddTodoDialog = useCallback(async () => {
    console.log('handleAddTodoDialog')
    if (!addTitle) {
      message.error('代办标题不能为空')
      return
    }
    setLoading(true)

    try {
      let newTodoList = await mockHttpRequest(1000, () => {
        return [
          ...todoList,
          {
            id: Math.random() * 100000000,
            title: addTitle,
            finished: false
          }
        ]
      })
      let newCurrentTodoList = getNewCurrentTodoList(keyword, newTodoList)
      setAddTodoDialogVisible(false)
      setTodoList(newTodoList)
      setCurrentTodoList(newCurrentTodoList)
      setAddTitle('')
    } catch (e) {
      console.log('添加代办失败', e)
    } finally {
      setLoading(false)
    }
  }, [addTitle, getNewCurrentTodoList, keyword, todoList])

  const updateEditTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('updateEditTitle')
      setAddTitle(e.target.value)
    },
    []
  )

  const addTodoDialog = useMemo(() => {
    console.log('addTodoDialog')
    return (
      <Modal
        title="添加 TODO"
        visible={addTodoDialogVisible}
        onOk={handleAddTodoDialog}
        onCancel={hideAddTodoDialog}
      >
        <Input
          placeholder="请输入代办标题"
          allowClear
          value={addTitle}
          onChange={updateEditTitle}
        />
      </Modal>
    )
  }, [
    addTodoDialogVisible,
    handleAddTodoDialog,
    hideAddTodoDialog,
    addTitle,
    updateEditTitle
  ])

  const updateKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('updateKeyword')
      let keyword = e.target.value
      let newCurrentTodoList = getNewCurrentTodoList(keyword, todoList)
      setCurrentTodoList(newCurrentTodoList)
      setKeyword(keyword)
    },
    [getNewCurrentTodoList, todoList]
  )

  const hideConfirmDeleteTodoDialog = useCallback(() => {
    setDeleteTodo(undefined)
  }, [])

  const handleDeleteTodo = useCallback(async () => {
    setLoading(true)

    try {
      let newTodoList = await mockHttpRequest(1000, () => {
        return todoList.filter(todo => todo.id !== deleteTodo?.id)
      })

      let newCurrentTodoList = getNewCurrentTodoList(keyword, newTodoList)

      setDeleteTodo(undefined)
      setTodoList(newTodoList)
      setCurrentTodoList(newCurrentTodoList)
    } catch (e) {
      console.log('删除代办失败', e)
    } finally {
      setLoading(false)
    }
  }, [deleteTodo, getNewCurrentTodoList, keyword, todoList])

  const confirmDeleteTodoDialog = useMemo(() => {
    console.log('confirmDeleteTodoDialog')
    if (!deleteTodo) {
      return <></>
    }
    return (
      <Modal
        title="提示"
        visible={true}
        onOk={handleDeleteTodo}
        onCancel={hideConfirmDeleteTodoDialog}
        okText="确认"
        cancelText="取消"
      >
        确认删除 {deleteTodo?.title} 吗
      </Modal>
    )
  }, [deleteTodo, handleDeleteTodo, hideConfirmDeleteTodoDialog])

  const onCheckedChanged = useCallback(
    async (todo: Todo) => {
      console.log('onCheckedChanged')
      setLoading(true)

      try {
        let newTodoList = await mockHttpRequest(500, () => {
          todo.finished = !todo.finished
          return [...todoList]
        })

        setTodoList(newTodoList)
      } catch (e) {
        console.log('修改代办状态失败', e)
      } finally {
        setLoading(false)
      }
    },
    [todoList]
  )

  const todoListComponent = useMemo(() => {
    console.log('todoListComponent')
    if (!currentTodoList || currentTodoList.length === 0) {
      return <Empty description="暂无数据" />
    }

    return currentTodoList.map(todo => (
      <TodoItem
        key={todo.id.toString()}
        todo={todo}
        onCheckedChanged={onCheckedChanged}
        onClickDelete={showConfirmDeleteDialog}
      />
    ))
  }, [currentTodoList, onCheckedChanged, showConfirmDeleteDialog])

  return (
    <>
      <Card
        title="Hooks 版 TODO 案例"
        extra={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Tag style={{ alignSelf: 'center', marginRight: '50px' }}>
              {currentDate.toLocaleTimeString()}
            </Tag>
            <Input
              placeholder="根据代办标题进行过滤"
              allowClear
              value={keyword}
              onChange={updateKeyword}
              style={{ marginRight: '70px' }}
            />
            <Button type="primary" onClick={showAddTodoDialog}>
              添加 TODO
            </Button>
          </div>
        }
      >
        {todoListComponent}
      </Card>
      {addTodoDialog}
      {confirmDeleteTodoDialog}
      <Loading visible={loading} />
    </>
  )
}

export default TodoListHooks
