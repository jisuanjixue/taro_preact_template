// import { useSignal, useComputed } from "@preact/signals";
// import { memo } from 'preact/compat';
// import { useLoad } from '@tarojs/taro'
import './index.less'
// import useSignalReactive from '../../hooks/useSignalReactive';
import { h } from 'preact';
import { Button, Cell, Swiper, Image, Skeleton } from '@nutui/nutui-react-taro';
import host from '../../utils/httpRequest/apiConfig.ts'

import bannerSvc from '@/services/bannerSvc';
import { useRequest } from 'ahooks';

const Index = () => {
  const { data, loading } = useRequest(bannerSvc.getList)
  console.log("🚀 ~ file: index.tsx:14 ~ Index ~ data:", data)
  // const InnerComponent = memo(() => {
  //   useSignalReactive(double);
  //   return (
  //     <section>
  //       <h1>double:{double.value}</h1>
  //       <h1>count:{count.value}</h1>
  //     </section>
  //   );
  // });
  // const count = useSignal(0)
  // const double = useComputed(() => count.value * 2);
  // useLoad(() => {
  //   console.log('Page loaded.')
  // })

  return (
    <div className={'pageIndex'}>
      {loading? <Skeleton width="250px" height="15px" animated /> :  
      <Swiper
        defaultValue={0}
        indicator
        autoPlay
        width={320}
        height={180}
      >
        {
          data?.data?.map(v => (
            <Swiper.Item>
              <Image src={`${host.api.baseUrl}/upload/${v.preview}`} width="100%" height={100}></Image>
            </Swiper.Item>
          ))
        }
       
      </Swiper> }
     
      {/* <h1>
        count:{count}, double:{double}
      </h1>
      <Cell title="我是标题" extra="描述文字" />
      <Button shape="square" type="primary" size="large"
        onClick={() => count.value++}
      >
        increment
      </Button>
      <InnerComponent /> */}
    </div>
  )
}

export default Index
