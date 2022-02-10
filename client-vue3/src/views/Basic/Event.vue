<template>
  <div>
    <h4>事件处理</h4>
    <button v-on:click="counter += 1">
      不推荐：直接在 v-on 后的内联 JavaScript 语句中加 1
    </button>
    <!-- 直接绑定方法时，会自动传入 event 参数 -->
    <button v-on:click="increment">推荐：绑定到单独方法来加 1</button>
    <!-- 内联 JavaScript 语句中调用方法时，默认不会自动传入 event 参数 -->
    <button v-on:click="incrementWithNum(2)">调用方法传递每次加 2</button>
    <!-- 内联 JavaScript 语句中调用方法时，可以通过特殊变量 $event 来传入 event 参数 -->
    <button v-on:click="incrementWithNum(2, $event)">
      调用方法传递每次加 2，并传入 event
    </button>
    <p>The button above has been clicked {{ counter }} times.</p>
    <!-- 点击 div2内容 以及里面的 span 和 button 都会触发 handleDivClick -->
    <div @click="handleDivClick">
      div1内容
      <span>span1内容</span>
      <button @click="handleBtnClick">button1内容</button>
    </div>
    <!-- 加了 .stop 修饰符后停止冒泡，加了 .prevent 修饰符后阻止默认行为，点击里面的 button 不会触发 handleDivClick，点击 div2内容 和 span 时才会触发 handleDivClick -->
    <div @click="handleDivClick">
      div2内容
      <span>span2内容</span>
      <button @click.stop="handleBtnClick">button21内容</button>
      <button @click.prevent="handleBtnClick">button22内容</button>
      <button @click.stop.prevent="handleBtnClick">button23内容</button>
    </div>
    <!-- 加了 .self 修饰符后只当事件是从侦听器绑定的元素本身触发时才触发回调，点击里面的 span 和 button 不会触发 handleDivClick，点击 div2内容 才会触发 handleDivClick -->
    <div @click.self="handleDivClick">
      div3内容
      <span>span3内容</span>
      <button @click="handleBtnClick">button3内容</button>
    </div>

    <!-- 键修饰符 enter、tab、delete、esc、up、down、left、right 等 -->
    <input @keyup.enter="onEnter" placeholder="监听回车" />
    <button @click.left="handleBtnClick">点击鼠标左键时才触发回调</button>
    <button @click.alt="handleBtnClick">
      按住 ctrl 键并点击鼠标时才触发回调
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increment(event) {
      this.counter++
      if (event) {
        // event 是原生 DOM 事件，直接绑定方法时，会自动传入 event 参数
        alert(event.target.tagName)
      }
    },
    incrementWithNum(num, event) {
      this.counter += num
      if (event) {
        // 内联 JavaScript 语句中调用方法时，默认不会自动传入 event 参数，可以通过特殊变量 $event 来传入
        alert(event.target.tagName)
      }
    },
    handleDivClick() {
      console.log('handleDivClick')
    },
    handleBtnClick() {
      console.log('handleBtnClick')
    },
    onEnter(e) {
      console.log('按了回车', e)
    }
  }
}
</script>
