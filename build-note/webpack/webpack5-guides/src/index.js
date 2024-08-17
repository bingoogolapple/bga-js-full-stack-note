import _ from "lodash";
// es module
import sum from "./sum";
// commonjs
const minus = require("./minus");

import "./iconfont.css";

import "./style.css";

import Icon from "./icon.png";

import jsonData from "./data.json";
import xmlData from "./data.xml";
import csvData from "./data.csv";
import tomlData from "./data.toml";
import yamlData from "./data.yaml";
import json5Data from "./data.json5";

import printMe, { printMe2 } from "./print";

import obj from "./obj.js";

function component() {
  obj.count++;
  console.log("index.js count", obj.count);

  const element = document.createElement("div");

  // lodash 在当前 script 中使用 import 引入
  element.innerHTML =
    _.join(["Hello", "webpack5"], " ") + sum(1, 3) + minus(5, 2);

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
  console.log("xmlData", xmlData);
  console.log("csvData", csvData);
  console.log("tomlData", tomlData);
  console.log("yamlData", yamlData);
  console.log("json5Data", json5Data);

  const btnElement = document.createElement("button");
  btnElement.innerHTML = "Click me and check the console!";
  btnElement.onclick = printMe;
  element.appendChild(btnElement);
  printMe2();

  return element;
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
