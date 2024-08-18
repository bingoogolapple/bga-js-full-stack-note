import _ from "lodash";
// es module
import sum from "./sum";
// commonjs
const minus = require("./minus");

import { cube } from "./testTreeShaking.js";

// preload chunk 会在父 chunk 加载时，以并行方式开始加载；具有中等优先级，并立即下载；会在父 chunk 中立即请求，用于当下时刻
// import(/* webpackPreload: true */ "./testLazyLoading");
// prefetch chunk 会在父 chunk 加载结束后开始加载；在浏览器闲置时下载；会用于未来的某个时刻
// import(/* webpackPrefetch: true */ "./testLazyLoading");

import "./iconfont.css";

import "./style.css";

import Icon from "./icon.png";

import jsonData from "./data.json";

import printMe, { printMe2 } from "./print";

import obj from "./obj.js";

function component() {
  obj.count++;
  console.log("index.js count", obj.count);

  const root = document.createElement("div");
  const element = document.createElement("div");
  root.appendChild(element);

  // lodash 在当前 script 中使用 import 引入
  let innerHTML = "";
  innerHTML += _.join(["Hello", "webpack4"], " ");
  innerHTML += sum(1, 3);
  innerHTML += minus(5, 2);
  innerHTML += cube(5);
  // 从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin
  innerHTML += process.env.NODE_ENV;
  element.innerHTML = innerHTML;

  // amd
  require(["./multi"], function (multi) {
    element.innerHTML += multi(2, 3);
  });

  element.classList.add("hello");

  // 将图像添加到我们已经存在的 div 中
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  const spanElement = document.createElement("span");
  spanElement.classList.add("iconfont", "icon-huiyuan");
  element.appendChild(spanElement);

  console.log("jsonData", jsonData);

  const btnElement = document.createElement("button");
  btnElement.innerHTML = "Click me and check the console!";
  btnElement.onclick = async () => {
    printMe();
    // 打包后的 bundle 名称默认是数字
    // const math = await import("./testLazyLoading.js");
    // 也可以通过 webpackChunkName 自定义
    const math = await import(
      /* webpackChunkName: "testLazyLoading" */ "./testLazyLoading.js"
    );
    console.log(math.square(3));
  };
  root.appendChild(btnElement);
  printMe2();

  return root;
}

// 存储 element，以在对应模块修改时重新渲染
let element = component();
document.body.appendChild(element);

// style-loader 使用模块热替换来加载 CSS。此 loader 在幕后使用了 module.hot.accept，在 CSS 依赖模块更新之后，会将其 patch 到 <style> 标签中
// 处理对应模块热替换，这里是手动处理的，检测到 sum.js 变更时重新渲染组件。真实项目开发时有对应的 loader 来指定添加相应的 hot 代码
// if (import.meta.webpackHot) {
if (module.hot) {
  // import.meta.webpackHot.accept("./sum.js", function () {
  module.hot.accept("./sum.js", function () {
    console.log("Accepting the updated sum module!");
    printMe();

    document.body.removeChild(element);
    // 重新渲染 component
    element = component();
    document.body.appendChild(element);
  });
}
