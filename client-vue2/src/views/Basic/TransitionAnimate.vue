<template>
  <div>
    <h4>过渡与动画</h4>
    <div class="demo" :class="classObject">
      {{ classObject }}
      <button @click="switchLeftToRightAnimation">
        switchLeftToRightAnimation
      </button>
    </div>
    <div class="demo bgTransition" :style="styleObject">
      {{ styleObject }}
      <button @click="switchBgTransition">switchBgTransition</button>
    </div>
    <div class="demo">
      <!-- 不指定 name 时，默认值为 v -->
      <!-- 过渡和动画时间不一致时，可以给 transition 标签指定 type 属性为 transition 或 animation，以便设置都以其中一个的时间为准 -->
      <transition>
        <div v-show="isShow">默认 name，{{ isShow }}</div>
      </transition>
      <button @click="switchDisplay">switchDisplay</button>
      <transition name="bga" type="transition">
        <div v-if="isShow">自定义 name，{{ isShow }}</div>
      </transition>
      <!-- 也可以直接给 transition 标签设置 duration 属性来强制指定时间 -->
      <transition
        :duration="1000"
        enter-active-class="customEnterActiveClass"
        leave-active-class="customLeaveActiveClass"
        enter-from-class="customEnterFromClass"
      >
        <div v-if="isShow">自定义出入场 class，{{ isShow }}</div>
      </transition>
      <h4 class="animate__animated animate__bounce">使用 animate.css 动画库</h4>
      <!-- duration 可以设置为对象形式，分别设置入场和出场时间 -->
      <transition
        :duration="{ enter: 1000, leave: 3000 }"
        enter-active-class="animate__animated animate__bounce"
        leave-active-class="animate__animated animate__flash"
      >
        <div v-if="isShow">
          自定义出入场 class，并使用 animate.css 动画库，{{ isShow }}
        </div>
      </transition>
      <transition
        :css="false"
        @before-enter="handleBeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
        @before-leave="handleBeforeLeave"
        @leave="handleLeave"
        @after-leave="handleAfterLeave"
      >
        <div v-show="isShow">取消 css 动画，使用 js 来实现动画</div>
      </transition>
      <!-- 多个单元素标签之间的切换 -->
      <!-- 什么都不写是一起执行，in-out 先展示后隐藏，out-in 先隐藏后展示 -->
      <!-- 设置 appear 为 true，首次展示也会执行，否则首次展示不执行 -->
      <transition mode="out-in" appear>
        <div v-if="isShow">Hello World</div>
        <div v-else>Bye World</div>
      </transition>
      <!-- 多个单组件之间的切换，可以像普通单元素标签一样 -->
      <transition mode="out-in">
        <EmailLogin v-if="isShow" />
        <UsernameLogin v-else />
      </transition>
      <!-- 多个单组件之间的切换，也可以使用动态组件方式 -->
      <transition mode="out-in">
        <component :is="isShow ? 'EmailLogin' : 'UsernameLogin'" />
      </transition>
    </div>
    <div class="demo">
      <!-- 列表动画用 transition-group 标签 -->
      <transition-group name="list">
        <span class="list-item" v-for="item in list" :key="item">{{
          item
        }}</span>
      </transition-group>
      <button @click="handleAddItem">添加条目</button>
    </div>
    <div class="demo">
      <!-- 状态动画 -->
      <span>{{ animateCount }}</span>
      <button @click="handleUpdateCount">修改总数 {{ count }}</button>
    </div>
  </div>
</template>

<script>
// https://animate.style
import 'animate.css'

import EmailLogin from '@/components/EmailLogin.vue'
import UsernameLogin from '@/components/UsernameLogin.vue'

export default {
  components: {
    EmailLogin,
    UsernameLogin
  },
  data() {
    return {
      classObject: {
        leftToRightAnimation: false
      },
      styleObject: {
        backgroundColor: 'red'
      },
      isShow: true,
      list: [1, 2, 3],
      count: 0,
      animateCount: 0
    }
  },
  methods: {
    switchLeftToRightAnimation() {
      this.classObject.leftToRightAnimation =
        !this.classObject.leftToRightAnimation
    },
    switchBgTransition() {
      this.styleObject.backgroundColor =
        this.styleObject.backgroundColor === 'red' ? 'pink' : 'red'
    },
    switchDisplay() {
      this.isShow = !this.isShow
    },
    handleBeforeEnter(el) {
      el.style.color = 'red'
    },
    handleEnter(el, done) {
      const animation = setInterval(() => {
        const color = el.style.color
        if (color === 'red') {
          el.style.color = 'green'
        } else {
          el.style.color = 'red'
        }
      }, 1000)
      setTimeout(() => {
        clearInterval(animation)
        done()
      }, 5000)
    },
    handleAfterEnter(el) {
      el.style.color = 'blue'
      console.log('入场动画结束')
    },
    handleBeforeLeave(el) {
      el.style.color = 'red'
    },
    handleLeave(el, done) {
      const animation = setInterval(() => {
        const color = el.style.color
        if (color === 'red') {
          el.style.color = 'blue'
        } else {
          el.style.color = 'red'
        }
      }, 1000)
      setTimeout(() => {
        clearInterval(animation)
        done()
      }, 5000)
    },
    handleAfterLeave(el) {
      console.log('出场动画结束', el)
    },
    handleAddItem() {
      this.list.unshift(this.list.length + 1)
    },
    handleUpdateCount() {
      this.count += 10
      if (this.animateCount < this.count) {
        const animation = setInterval(() => {
          this.animateCount++
          if (this.animateCount === this.count) {
            clearInterval(animation)
          }
        }, 100)
      }
    }
  }
}
</script>

<style scoped lang="less">
.demo {
  background-color: pink;
  padding: 5px;
  margin: 5px;
}

// 动画
@keyframes leftToRightTransform {
  0% {
    transform: translateX(-100px);
  }
  50% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(0px);
  }
}
.leftToRightAnimation {
  animation: leftToRightTransform 3s;
}

// 过渡
.bgTransition {
  transition: background-color 3s ease;
}

// 单元素组件出入场动画
@keyframes enterLeaveShake {
  0% {
    transform: translateX(-100px);
  }
  50% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(50px);
  }
}
// transition 标签 + (v-if 或 v-show) + 固定的 class 名字，[transition 标签 name 属性值（默认为 v）]-[enter|leave]-[from|to|active]
// 入场动画
.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  // 透明度过渡效果
  transition: opacity 3s ease-out;
  // 平移动画
  animation: enterLeaveShake 3s;
}
// 出场动画
.v-leave-from {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: opacity 3s ease-in;
  animation: enterLeaveShake 3s;
}

// transition 标签 name 设置为 bga 的情况
.bga-enter-active {
  transition: opacity 3s ease-out;
  animation: enterLeaveShake 3s;
}
.bga-enter-from {
  opacity: 0;
}
.bga-enter-to {
  opacity: 1;
}
.bga-leave-active {
  transition: opacity 3s ease-in;
  animation: enterLeaveShake 3s;
}
.bga-leave-from {
  opacity: 1;
}
.bga-leave-to {
  opacity: 0;
}

// transition 标签自定义出入场 class
.customEnterFromClass {
  opacity: 0.5;
}
.customEnterActiveClass {
  transition: opacity 3s ease-out;
  animation: enterLeaveShake 3s;
}
.customLeaveActiveClass {
  transition: opacity 3s ease-in;
  animation: enterLeaveShake 3s;
}

// 列表动画
.list-item {
  display: inline-block;
  background-color: red;
  margin-right: 5px;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.list-enter-active {
  transition: all 0.5s ease-in;
}
.list-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.list-move {
  transition: all 0.5s ease-in;
}
</style>
