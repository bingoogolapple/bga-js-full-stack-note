import React, { useEffect } from 'react'

const { remote } = window.require('electron')
// 引入 electron 中的对象
const { Menu } = window.require('electron').remote

const ContextMenuDemo: React.FC = () => {
  useEffect(() => {
    const type = 'contextmenu'
    const contextMenuListener = (e: Event) => {
      console.log('sdfsdf', e)
      e.preventDefault()
      const contextMenu = Menu.buildFromTemplate([
        {
          label: '菜单a',
          submenu: [
            {
              label: '菜单a1',
              click: (menuItem, browserWindow, event) => {
                console.log('点击了菜单a1', menuItem, browserWindow, event)
              },
              accelerator: 'command + m'
            },
            { label: '菜单a2' }
          ]
        },
        {
          label: '菜单b',
          submenu: [{ label: '菜单b1' }, { label: '菜单b2' }]
        }
      ])
      contextMenu.popup({ window: remote.getCurrentWindow() })
    }

    window.addEventListener(type, contextMenuListener)
    return () => {
      window.removeEventListener(type, contextMenuListener)
    }
  }, [])

  return <></>
}

export default ContextMenuDemo
