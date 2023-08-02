import { View } from '@tarojs/components'
import { useSignal, useComputed } from "@preact/signals";
// import { useLoad } from '@tarojs/taro'
import './index.less'
import { h } from 'preact';
// import { useEffect } from 'preact/hooks';
import { Button, Cell } from '@nutui/nutui-react-taro';
// import { useRequest } from 'ahooks'

// import caseSvc from '@/services/caseSvc';


const Index = () => {

  const count = useSignal(0)
  const double = useComputed(() => count.value * 2);

  return (
    <View>
      <h1>
        count:{count}, double:{double}
      </h1>
      <Button shape="square" type="primary" size="large"
        onClick={() => count.value++}
      >
        increment
      </Button>
    </View>
  )
}

export default Index
