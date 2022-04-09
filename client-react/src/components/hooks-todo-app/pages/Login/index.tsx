import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { useAsync } from '../../hooks/useAsync'
import { useAuthContext } from '../../utils/auth'

const LoginPage = () => {
  const { login } = useAuthContext()
  const { error, run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = React.useCallback(
    async (values: any) => {
      run(login(values))
    },
    [login, run]
  )
  React.useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error])
  return (
    <Form onFinish={handleSubmit} labelCol={{ span: 4 }}>
      <Form.Item
        label="用户名"
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'请输入用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        label="密码"
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'请输入密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 4 }}>
        <Button loading={isLoading} htmlType={'submit'} type={'primary'}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
export default LoginPage
