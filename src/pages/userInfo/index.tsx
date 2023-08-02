import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Userinfo() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='userInfo'>
      <Text>Hello world!</Text>
    </View>
  )
}
