import { Button } from 'antd'
import React, { useCallback } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync'
import { useAuthContext } from '../../utils/auth'

const HomePage = (props: RouteComponentProps) => {
  const { userInfo, logout } = useAuthContext()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleLogout = useCallback(async () => {
    try {
      await run(logout())
    } catch (e) {
      console.error('退出登录失败', e)
    }
  }, [logout, run])
  return (
    <div>
      <span>{userInfo?.username}</span>
      <Button loading={isLoading} type={'primary'} onClick={handleLogout}>
        退出登录
      </Button>
    </div>
  )
}

export default withRouter(HomePage)
