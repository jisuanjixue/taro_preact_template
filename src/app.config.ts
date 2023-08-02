export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/negative/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#144FA9",
    backgroundColor: "#FFFFFF",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./assets/images/unhome.png",
        selectedIconPath: "./assets/images/home.png",
        text: "首页"
      },
      {
        pagePath: "pages/negative/index",
        iconPath: "./assets/images/unlist.png",
        selectedIconPath: "./assets/images/list.png",
        text: "负面清单"
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./assets/images/unme.png",
        selectedIconPath: "./assets/images/me.png",
        text: "用户中心"
      }
    ]
  },
})
