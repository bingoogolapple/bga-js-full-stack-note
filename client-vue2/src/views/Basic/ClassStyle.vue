<template>
  <div>
    <h4>Class 与 Style 绑定</h4>
    <h5>绑定 HTML Class</h5>
    <div v-bind:class="{ active: isActive }">
      对象：active 这个 class 存在与否将取决于数据 isActive 是否为真
    </div>
    <div
      class="static"
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
    >
      对象：可以与默认的 class 组合使用，也可以设置多个动态 class
    </div>
    <div v-bind:class="classObject">
      对象：绑定的数据对象不必内联定义在模板里
    </div>
    <div v-bind:class="classObjectComputed">
      对象：绑定的数据对象不必内联定义在模板里
    </div>
    <div v-bind:class="[activeClass, errorClass]">
      数组：指定一个 class 列表
    </div>
    <div v-bind:class="[isActive ? activeClass : '', errorClass]">
      数组：指定一个 class 列表，可以用三元表达式
    </div>
    <div v-bind:class="[{ active: isActive }, errorClass]">
      数组：指定一个 class 列表，在数组语法中也可以使用对象语法
    </div>
    <h5>绑定内联样式</h5>
    <span
      >当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS property
      时，如transform，Vue.js 会自动侦测并添加相应的前缀</span
    >
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">
      对象：CSS property 名可以用驼峰式 (camelCase) 或短横线分隔
      (kebab-case，记得用引号括起来) 来命名
    </div>
    <div v-bind:style="styleObject">
      对象：直接绑定到一个样式对象通常更好，这会让模板更清晰
    </div>
    <div v-bind:style="[baseStyles, overridingStyles]">
      数组：数组语法可以将多个样式对象应用到同一个元素上，后者会覆盖前者中对应的属性
    </div>
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
      多重值：提供一个包含多个值的数组，这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的
      flexbox，那么就只会渲染 display: flex
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassStyle',
  data() {
    return {
      isActive: true,
      hasError: true,
      classObject: {
        active: true,
        'text-danger': false
      },
      activeClass: 'active',
      errorClass: 'text-danger',
      activeColor: 'red',
      fontSize: 15,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      baseStyles: {
        color: 'red',
        fontSize: '13px'
      },
      overridingStyles: {
        color: 'blue',
        fontSize: '13px'
      }
    }
  },
  computed: {
    classObjectComputed() {
      return {
        active: this.isActive && !this.hasError,
        'text-danger': this.hasError
      }
    }
  }
}
</script>

<style scoped lang="less">
.static {
  font-size: 18px;
}
.active {
  background-color: #42b983;
}
.text-danger {
  color: red;
}
</style>