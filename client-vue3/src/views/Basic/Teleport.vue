<template>
  <div>
    <h4>Teleport 传送门</h4>
    <button @click="modalOpen = true">打开 {{ modalOpen }}</button>
    <teleport to="body">
      <div v-if="modalOpen" class="teleportModel">
        <div>
          我是传送门对话框，父亲是 body
          <button @click="modalOpen = false">关闭对话框</button>
        </div>
      </div>
    </teleport>
    <teleport to="#teleport-container">
      <div v-if="modalOpen" class="teleportModel">
        <div>
          我是传送门对话框，父亲是 teleport-container
          <button @click="modalOpen = false">关闭对话框</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
// https://v3.cn.vuejs.org/guide/teleport.html
export default {
  data() {
    return {
      modalOpen: false
    }
  }
}
</script>

<style scoped lang="less">
.teleportModel {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc60;
}
</style>
