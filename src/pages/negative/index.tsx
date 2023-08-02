import { View } from '@tarojs/components'
import { useSignal, useComputed } from "@preact/signals";
import { memo } from 'preact/compat';
import { useLoad } from '@tarojs/taro'
import './index.less'
import useSignalReactive from '../../hooks/useSignalReactive';
import { h } from 'preact';
import { Button, Cell } from '@nutui/nutui-react-taro';

const Index = () => {
  const InnerComponent = memo(() => {
    useSignalReactive(double);
    return (
      <section>
        <h1>double:{double.value}</h1>
        <h1>count:{count.value}</h1>
      </section>
    );
  });
  const count = useSignal(0)
  const double = useComputed(() => count.value * 2);
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View>
      <h1>
        count:{count}, double:{double}
      </h1>
      <Cell title="我是标题" extra="描述文字" />
      <Button shape="square" type="primary" size="large"
        onClick={() => count.value++}
      >
        increment
      </Button>
      <InnerComponent />
    </View>
  )
}

export default Index
