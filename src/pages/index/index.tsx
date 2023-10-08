
import './index.less'
import { Fragment, h } from 'preact';
import { Button, Cell, Swiper, Image, Skeleton, ConfigProvider } from '@nutui/nutui-react-taro';
import host from '../../utils/httpRequest/apiConfig'

import bannerSvc from '@/services/bannerSvc';
import { useRequest } from 'ahooks';
// import { Close, Left, Share } from '@nutui/icons-react-taro';
// import Taro from '@tarojs/taro';

const Index = () => {
  const { data, loading } = useRequest(bannerSvc.getList)
  console.log("🚀 ~ file: index.tsx:14 ~ Index ~ data:", data)

  return (
    <Fragment>
      <nav-bar capsule-color="white" title-color="#ffffff" title="云南省市场准入服务" bg-color="transparent" hidden-capsule="{{true}}">
        <image class="capsule-bar-bg" src="../../assets/images/homepagenav.png"></image>
        <view class="intro">欢迎使用代码片段，可在控制台查看代码片段的说明和文档</view>
      </nav-bar>
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
