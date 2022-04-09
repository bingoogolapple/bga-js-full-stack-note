module.exports = {
  semi: false, // 末尾不加分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 不允许围绕非严格要求的对象字面值属性名称进行引号
  trailingComma: 'all', // 多行时尾行追加逗号
  printWidth: 120, // 单行长度
  tabWidth: 2, // 缩进长度
  useTabs: false, // 使用空格代替 tab 缩进
  insertSpaceBeforeFunctionParenthesis: true, // function 前加空格
  bracketSpacing: true, // 对象前后（即大括号内的收尾）需要添加空格
  arrowParens: 'avoid', // 箭头函数只有一个参数时参数周围不需要加小括号
  requirePragma: false, // 无需顶部注释即可格式化。Prettier 可以限制自己只能格式化文件顶部包含特殊注释 @prettier 的文件，称为杂注。逐渐将大型，无格式的代码库转换为漂亮的代码库时，这非常有用
  insertPragma: false, // 不需要在已被 Preitter 格式化的文件顶部加标注
  proseWrap: 'preserve', // 使用默认的这行标准
  endOfLine: 'lf', // 换行符使用 lf
  rangeStart: 0, // 格式化整个文件
  rangeEnd: Infinity,

  jsxSingleQuote: true, // jsx 中使用单引号
  jsxBracketSameLine: true, // 将多行（多属性）JSX 元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）
  htmlWhitespaceSensitivity: 'ignore', // 对 HTML 全局空白不敏感
  vueIndentScriptAndStyle: false, // 不对 vue 中的 script 及 style 标签缩进
  embeddedLanguageFormatting: 'auto', // 是否格式化嵌入到 JS 中的 html 标记的代码段或者 Markdown 语法，auto:格式化，off:不格式化
}
