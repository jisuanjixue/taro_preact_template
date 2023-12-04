import { useSignal, useComputed } from "@preact/signals";
import { useLoad } from '@tarojs/taro'
import './index.less'
import { h } from 'preact';
import { Button, Cell } from '@nutui/nutui-react-taro';

const Index = () => {
  const count = useSignal(0)
  const double = useComputed(() => count.value * 2);
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <div>
      <h1>
        count:{count}, double:{double}
      </h1>
      <Cell title="我是标题" extra="描述文字" />
      <Button shape="square" type="primary" size="large"
        onClick={() => count.value++}
      >
        increment
      </Button>
    </div>
  )
}

export default Index
