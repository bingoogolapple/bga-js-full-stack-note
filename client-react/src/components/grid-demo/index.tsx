import React from 'react'
import './index.scss'
import xiaomi from '../../assets/xiaomi.png'

// https://juejin.cn/post/6854573220306255880
export default class GridDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>grid 布局</h2>
        <div className="grid-box grid-demo-1">
          <div>demo1-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>

        <div className="grid-box grid-demo-2">
          <div>demo2-1</div>
          <div>2</div>
          <div>3</div>
        </div>

        <div className="grid-box grid-demo-3">
          <div>demo3-1</div>
          <div>2</div>
          <div>3</div>
        </div>

        <div className="grid-box grid-demo-4">
          <div>demo4-1</div>
          <div>2</div>
          <div>3</div>
        </div>

        <div className="flex-box">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        <div className="grid-box grid-demo-5">
          <div>demo5-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>

        <div className="grid-box grid-demo-6">
          <div>demo6-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>

        <div className="grid-box grid-demo-7">
          <div>demo7-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
        </div>

        <div className="grid-box grid-demo-8">
          <div>demo8-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        <div className="grid-box grid-demo-9">
          <div>demo9-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        <div className="grid-box grid-demo-10">
          <div>demo10-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        <div className="grid-box grid-demo-11">
          <div>demo11-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        <div className="grid-box grid-demo-12">
          <div>demo12-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className="grid-box grid-demo-13">
          <div>demo13-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <div className="grid-box grid-demo-14">
          <div>demo14-1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div className="grid-box grid-demo-15">
          <div>demo15-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
        </div>

        <div className="grid-demo-16">
          <img alt="" src={xiaomi} />
          <span>价格</span>
        </div>

        <div className="grid-box grid-demo-17">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>

        <div className="grid-box grid-demo-18">
          <div className="col-3">3</div>
          <div className="col-9">9</div>
          <div className="col-6">6</div>
          <div className="col-6">6</div>
        </div>

        <div className="grid-box grid-demo-19">
          <div>demo19-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
        </div>

        <div className="grid-box grid-demo-20">
          <div>demo20-1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
        </div>

        <div className="grid-demo-21">
          <div className="top-title">标题</div>
          <div className="top-list">
            <div className="theme1">
              <a href="#">
                <h3>标题1</h3>
                <p>内容1</p>
              </a>
            </div>
            <div className="theme2">
              <a href="#">
                <h3>标题2</h3>
                <p>内容2</p>
              </a>
            </div>
            <div className="theme1">
              <a href="#">
                <h3>标题3</h3>
                <p>内容3</p>
              </a>
            </div>
            <div className="theme1">
              <a href="#">
                <h3>标题4</h3>
                <p>内容4</p>
              </a>
            </div>
            <div className="theme1">
              <a href="#">
                <h3>标题5</h3>
                <p>内容5</p>
              </a>
            </div>
            <div className="theme3">
              <a href="#">
                <h3>标题6</h3>
                <p>内容6</p>
              </a>
            </div>
            <div className="theme3">
              <a href="#">
                <h3>标题7</h3>
                <p>内容7</p>
              </a>
            </div>
          </div>
          <div className="top-page">
            <span>1</span>
            <a href="#">2</a>
            <a href="#">3</a>
          </div>
        </div>

        <ul className="grid-demo-22">
          <li>
            <div>
              <a href="#">手机</a>
              <a href="#">电话卡</a>
            </div>
            <i className="right-arrow">&gt;</i>

            <ul className="nav-menu">
              <li>
                <img src={xiaomi} alt="" />
                <p>小米1</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米2</p>
              </li>
            </ul>
          </li>
          <li>
            <div>
              <a href="#">笔记本</a>
              <a href="#">显示器</a>
              <a href="#">平板</a>
            </div>
            <i className="right-arrow">&gt;</i>

            <ul className="nav-menu">
              <li>
                <img src={xiaomi} alt="" />
                <p>小米1</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米2</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米3</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米4</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米6</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米6</p>
              </li>
              <li>
                <img src={xiaomi} alt="" />
                <p>小米7</p>
              </li>
            </ul>
          </li>
        </ul>

        <div className="grid-demo-23">
          <div>header</div>
          <div>left</div>
          <div>content</div>
          <div>right</div>
          <div>footer</div>
        </div>
      </div>
    )
  }
}
