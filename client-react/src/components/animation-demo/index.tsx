import React from 'react'
import './index.scss'

export default class AnimationDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>动画</h2>
        <div className="box demo-1"></div>
        <div className="box demo-2"></div>
        <div className="box demo-3">
          <div className="cell"></div>
        </div>
        <div className="box demo-4">
          <div className="cell"></div>
        </div>
        <div className="box demo-5"></div>
      </div>
    )
  }
}
