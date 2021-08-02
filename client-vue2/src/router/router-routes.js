// import Dynamic from '../views/Router/Dynamic.vue'
import ComponentParam from '../views/Router/ComponentParam.vue'
// import NameRouterView from '../views/Router/NameRouterView.vue'
// import UserEmailsSubscriptions from '../views/Router/UserEmailsSubscriptions.vue'
// import UserProfile from '../views/Router/UserProfile.vue'
// import UserProfilePreview from '../views/Router/UserProfilePreview.vue'

export default [
  {
    // 动态路径参数 以冒号开头
    path: 'dynamic/user/:username/post/:post_id', // 注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
    alias: 'dongtai/user/:username/post/:post_id', // /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样
    name: 'Dynamic',
    // component: Dynamic,
    /**
     * 路由基本进行代码分割实现懒加载
     * 添加 webpackChunkName 注释指定 chunkName 后会生成 dynamic.js，否则会生成 数字.js
     * 如果想把某个路由下的所有组件都打包在同个异步块中，指定相同的 webpackChunkName 即可
     */
    component: () =>
      import(/* webpackChunkName: "dynamic" */ '../views/Router/Dynamic.vue')
  },
  // 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。使用 props 将组件和路由解耦
  {
    path: 'componentParam/boolean/:id',
    component: ComponentParam,
    props: true // 如果 props 被设置为 true，route.params 将会被设置为组件属性，route.query 不会被设置为组件属性
  },
  {
    path: 'componentParam/obj/:id',
    component: ComponentParam,
    props: {
      // 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用
      id: 222,
      qp1: '我是查询参数值22'
    }
  },
  {
    path: 'componentParam/method/:id',
    component: ComponentParam,
    // 可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等
    // 请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应
    props: route => ({ id: route.params.id, qp1: route.query.qp1 })
  },
  {
    path: 'nameRouterView',
    // component: NameRouterView, // 使用命名视图创建嵌套视图
    component: () =>
      import(
        /* webpackChunkName: "name-router-view" */ '../views/Router/NameRouterView.vue'
      ),
    children: [
      {
        path: 'emails',
        // component: UserEmailsSubscriptions
        component: () =>
          import(
            /* webpackChunkName: "name-router-view" */ '../views/Router/UserEmailsSubscriptions.vue'
          )
      },
      {
        path: 'profile',
        // 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)
        components: {
          // default: UserProfile,
          // helper: UserProfilePreview
          default: () =>
            import(
              /* webpackChunkName: "name-router-view" */ '../views/Router/UserProfile.vue'
            ),
          helper: () =>
            import(
              /* webpackChunkName: "name-router-view" */ '../views/Router/UserProfilePreview.vue'
            )
        }
      }
    ]
  }
  // 对于包含命名视图的路由，如果想启用路由组件传参，必须分别为每个命名视图添加 `props` 选项
  // {
  //   path: 'user/:id',
  //   components: { default: User, sidebar: Sidebar },
  //   props: { default: true, sidebar: false }
  // }
]
