export default definePageConfig({
  navigationBarTitleText: '首页',
  navigationStyle: 'custom',
  usingComponents: {
    // 定义需要引入的第三方组件
    // 1. key 值指定第三方组件名字，以小写开头
    // 2. value 值指定第三方组件 js 文件的相对路径
    'nav-bar': '../../components/capsule-bar/index',
  },
})
