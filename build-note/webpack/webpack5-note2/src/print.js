import _ from "lodash";

import obj from "./obj.js";
obj.count++;
console.log("print.js count", obj.count);

console.log(_.join(["Another", "module", "loaded!"], " "));

export const printMe2 = function () {
  console.log("printMe2");
};

export default function printMe() {
  console.log("I get called from print.js!");
}
