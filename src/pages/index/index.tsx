// import { useSignal, useComputed } from "@preact/signals";
// import { memo } from 'preact/compat';
// import { useLoad } from '@tarojs/taro'
import './index.less'
// import useSignalReactive from '../../hooks/useSignalReactive';
import { Fragment, h } from 'preact';
import { Button, Cell, Swiper, Image, Skeleton, ConfigProvider } from '@nutui/nutui-react-taro';
import host from '../../utils/httpRequest/apiConfig'
// import { NavBar } from 'taro-navigationbar';

import bannerSvc from '@/services/bannerSvc';
import { useRequest } from 'ahooks';
import { Close, Left, Share } from '@nutui/icons-react-taro';
import Taro from '@tarojs/taro';

const Index = () => {
  const { data, loading } = useRequest(bannerSvc.getList)
  console.log("🚀 ~ file: index.tsx:14 ~ Index ~ data:", data)

  return (
    <Fragment>
       <Image src="../../assets/images/homepagenav.png" width="100%" height="100px" />
      {/* <NavBar
        fixed={true}
        safeArea={true}
        placeholder={true}
        onBackClick={(e) => Taro.showToast({ title: '返回' })}
      >
      </NavBar> */}
      <div className={'pageIndex'}>
        {loading ? <Skeleton width="250px" height="15px" animated /> :
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

          </Swiper>}
      </div>
    </Fragment>
  )
}

export default Index
