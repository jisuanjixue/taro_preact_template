import { PropsWithChildren } from 'react'
import { useError, useLaunch } from '@tarojs/taro'
import '@tarojs/taro/html5.css'
import './app.less'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import { h } from 'preact'

const App = ({ children }: PropsWithChildren<any>) => {
  useLaunch(() => {
    console.log('App launched.')
  })
  useError((error) => console.log(error))

  // children 是将要会渲染的页面
  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  )

}

export default App
