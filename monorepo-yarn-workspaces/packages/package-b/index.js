require("@monorepo-yarn-workspaces/package-a");
console.log("这是 package-b");
const lodash = require("lodash");
console.log("package-b lodash.VERSION", lodash.VERSION);
