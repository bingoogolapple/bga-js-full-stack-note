import { createContext } from 'react'

export interface IThemeProps {
  color: string
  background: string
}

export const themes: { [key: string]: IThemeProps } = {
  light: {
    color: '#000',
    background: '#eee'
  },
  dark: {
    color: '#fff',
    background: '#222'
  }
}
export const ThemeContext = createContext(themes.light)
// 默认叫 Context
ThemeContext.displayName = 'ThemeContext'
