<template>
  <div>
    <h4>数据绑定、条件渲染</h4>
    <div>{{ rootMsg }}</div>
    <div>{{ $customGlobalMsg1 }}</div>
    <input v-model="message" /><br />
    <!-- 还有 number、trim 等修饰符 -->
    <input
      v-model.lazy="message"
      placeholder="加了 .lazy 修饰符后，输入内容后不会立即触发属性变化，失去焦点时才会触发属性变化"
    /><br />
    <div v-once ref="testRef">
      一次性的插值，当数据改变时，插值处的内容不会更新：{{ message }}
    </div>
    <div v-if="messageVisibility" v-bind:title="tip">
      v-if 控制 | {{ message }} | {{ message + message }}
    </div>
    <ul v-else>
      <li>不满足 v-if、v-else-if 条件时元素不会被添加到 dom 树中，惰性的</li>
      <li>
        不满足 v-show 条件时元素还是会添加到 dom 树中，只是将 css 样式中的
        display 设置为了 none
      </li>
      <li>
        v-if 有更高的切换开销，而 v-show
        有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show
        较好；如果在运行时条件很少改变，则使用 v-if 较好
      </li>
      <li>
        因为 v-if
        是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个
        template 元素当做不可见的包裹元素，并在上面使用
        v-if。最终的渲染结果将不包含 template 元素
      </li>
    </ul>
    <div v-show="messageVisibility" v-bind:title="tip">
      v-show 控制 | {{ message }} | {{ message + message }}
    </div>
    <button v-on:click="switchMessageVisibility">
      非缩写方式：修改消息可见状态
    </button>
    <button type="primary" @click.prevent="switchMessageVisibility">
      缩写方式+修饰符阻止默认行为：修改消息可见状态
    </button>
    <button type="success" @[eventname]="switchMessageVisibility">
      缩写方式+动态参数：修改消息可见状态
    </button>
    <div>
      <a v-bind:href="website" target="_blank" rel="noopener"
        >非缩写方式：个人网站</a
      ><br />
      <a :href="website" target="_blank" rel="noopener">缩写方式：个人网站</a
      ><br />
      <a :[attrname]="website" target="_blank" rel="noopener"
        >缩写方式+动态参数：个人网站</a
      >
    </div>
    <p>双大括号会将数据解释为普通文本，而非 HTML 代码: {{ rawHtml }}</p>
    <p>
      为了输出真正的 HTML，需要使用 v-html 指令: <span v-html="rawHtml"></span>
    </p>
  </div>
</template>

<script>
export default {
  inject: ['rootMsg'],
  data() {
    return {
      message: '我是消息',
      tip: '页面加载于 ' + new Date().toLocaleString(),
      messageVisibility: true,
      eventname: 'click',
      attrname: 'href', // 避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写
      website: 'http://www.bingoogolapple.cn',
      rawHtml: '<span style="color: red;">应该展示为红色</span>'
    }
  },
  methods: {
    // switchMessageVisibility: function () {
    // 两种写法都可以
    switchMessageVisibility() {
      this.messageVisibility = !this.messageVisibility
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.testRef.innerHTML = '通过 ref 拿到节点的引用后进行修改'

      this.$customGlobalMsg1 = '我是修改后全局自定义属性消息1，不会影响其他组件'
    }, 5000)
  }
}
</script>
