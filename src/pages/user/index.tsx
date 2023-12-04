import { useSignal, useComputed } from "@preact/signals";
import './index.less'
import { h } from 'preact';
import { Button, Cell } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';


const Index = () => {

  const count = useSignal(0)
  const double = useComputed(() => count.value * 2);

  return (
    <div>
      <h1>
        count:{count}, double:{double}
      </h1>
      <Button shape="square" type="primary" size="large"
        onClick={() => count.value++}
      >
        increment
      </Button>
      <Button shape="square" type="primary" size="large"
        onClick={() => Taro.navigateTo({ url: '/pages/userInfo/index' })}
      >
        我的投诉
      </Button>
    </div>
  )
}

export default Index
