<template>
  <div>
    <h4>列表渲染</h4>
    <h5>把数组对应为一组元素</h5>
    <div>
      不要使用对象或数组之类的非基本类型值作为 v-for 的
      key。请用字符串或数值类型的值
    </div>
    <div>可以利用带有 v-for 的 template 来循环渲染一段包含多个元素的内容</div>
    <div>
      不推荐在同一元素上使用 v-if 和 v-for，当它们处于同一节点，v-for 的优先级比
      v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for
      循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用。
      如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于 v-for
      的父元素（也可以在 v-for 外面加一层 template）上
    </div>
    <ol>
      <li v-for="todo in todos" v-bind:key="todo.id">
        {{ todo.text }}
      </li>
    </ol>
    v-for 还支持一个可选的第二个参数
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="todo.id">
        {{ index }} - {{ todo.text }}
      </li>
    </ul>
    也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法
    <ul>
      <li v-for="(todo, index) of todos" v-bind:key="todo.id">
        {{ index }} - {{ todo.text }}
      </li>
    </ul>
    <h5>v-for 里使用对象</h5>
    <ul>
      <li v-for="value in personInfo" v-bind:key="value">
        {{ value }}
      </li>
    </ul>
    也可以提供第二个的参数为 property 名称 (也就是键名)
    <ul>
      <li v-for="(value, name) in personInfo" v-bind:key="name">
        {{ name }}:{{ value }}
      </li>
    </ul>
    还可以用第三个参数作为索引
    <ul>
      <li v-for="(value, name, index) in personInfo" v-bind:key="name">
        {{ index }} - {{ name }}:{{ value }}
      </li>
    </ul>
    v-for 也可以接受整数。在这种情况下，它会把模板重复对应次数
    <div>
      <span v-for="n in 10" :key="n">{{ n }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'For',
  data() {
    return {
      todos: [
        { id: 0, text: '学习 JavaScript' },
        { id: 1, text: '学习 Vue' },
        { id: 2, text: '整个牛项目' }
      ],
      personInfo: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      // 方式一：使用指定方法增删改数组中的元素能生效
      // this.todos.push({ id: 3, text: '学习 React' })

      // 方式二：直接修改整个数组后能生效
      // this.todos = [
      //   { id: 0, text: '学习 JavaScript new' },
      //   { id: 1, text: '学习 Vue new' },
      //   { id: 2, text: '整个牛项目 new' }
      // ]

      // 方式三：直接替换数组中元素
      this.todos[0] = { id: 0, text: '学习 JS' }

      // 直接修改对象的某个属性可以生效
      this.personInfo.title = '修改后'
    }, 2000)
  }
}
</script>
