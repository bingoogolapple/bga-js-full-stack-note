<template>
  <div>
    <h4>命名视图</h4>
    <!-- 
      有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。
      你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default
    -->
    <router-view />
    <router-view name="helper" />
  </div>
</template>

<script>
export default {
  name: 'NameRouterView'
}
</script>

<style scoped lang="less">
</style>
