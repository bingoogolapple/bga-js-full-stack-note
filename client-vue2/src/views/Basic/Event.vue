<template>
  <div>
    <h4>事件处理</h4>
    <button v-on:click="counter += 1">
      不推荐：直接在 v-on 后的内联 JavaScript 语句中加 1
    </button>
    <button v-on:click="increment">推荐：绑定到单独方法来加 1</button>
    <button v-on:click="incrementWithNum(2)">调用方法传递每次加 2</button>
    <button v-on:click="incrementWithNum(2, $event)">
      调用方法传递每次加 2，并传入 event
    </button>
    <p>The button above has been clicked {{ counter }} times.</p>
  </div>
</template>

<script>
export default {
  name: 'Event',
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increment(event) {
      this.counter++
      if (event) {
        // event 是原生 DOM 事件，直接绑定方法时会自动传入 event 参数
        alert(event.target.tagName)
      }
    },
    incrementWithNum(num, event) {
      this.counter += num
      if (event) {
        // 内联 JavaScript 语句中调用方法时，默认不会自动传入 event 参数，可以通过特殊变量 $event 来传入
        alert(event.target.tagName)
      }
    }
  }
}
</script>
