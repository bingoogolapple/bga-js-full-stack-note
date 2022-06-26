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

import obj from './obj.js';
obj.count++;
console.log('index.js count', obj.count);

function component() {
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

document.body.appendChild(component());
