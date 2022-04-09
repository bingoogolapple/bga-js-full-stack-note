import { Menu } from 'electron'

export function createMenu() {
  const menu = Menu.buildFromTemplate([
    {
      label: '菜单1',
      submenu: [
        {
          label: '菜单11',
          click: (menuItem, browserWindow, event) => {
            console.log('点击了菜单11', menuItem, browserWindow, event)
          },
          accelerator: 'command + n'
        },
        { label: '菜单12' }
      ]
    },
    {
      label: '菜单2',
      submenu: [{ label: '菜单' }, { label: '菜单' }]
    }
  ])
  Menu.setApplicationMenu(menu)
}
