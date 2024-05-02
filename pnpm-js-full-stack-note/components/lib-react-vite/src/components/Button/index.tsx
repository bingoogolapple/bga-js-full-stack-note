import React from 'react'
import './index.css'

export interface IButtonProps {
  onClick: () => void
  children: React.ReactNode
}
export const Button: React.FC<IButtonProps> = ({ onClick, children }) => {
  return (
    <button className="bga-button" onClick={onClick}>
      {children}
    </button>
  )
}
