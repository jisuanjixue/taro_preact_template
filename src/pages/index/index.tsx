
import './index.less'
import { Fragment, h } from 'preact';
import { Button, Cell, Swiper, Image, Skeleton, ConfigProvider, Row, Col } from '@nutui/nutui-react-taro';
import host from '../../utils/httpRequest/apiConfig'
import navBarImage from '../../assets/images/homepagenav.png'
import deviceUtil from '../../utils/device-util.js'

import bannerSvc from '@/services/bannerSvc';
import { useRequest } from 'ahooks';
// import { Close, Left, Share } from '@nutui/icons-react-taro';
// import Taro from '@tarojs/taro';

const Index = () => {
  const { data, loading } = useRequest(bannerSvc.getList)
  console.log("🚀 ~ file: index.tsx:14 ~ Index ~ data:", data)

  return (
    <Fragment>
      <capsule-bar capsuleColor="white" titleColor="#ffffff" title="云南省市场准入服务" bgColor="transparent" hiddenCapsule={true}>
        <Image className="capsule_bar_bg" src={navBarImage} height={`${deviceUtil.getNavigationBarHeight() + 300}rpx`}></Image>
        <Row type="flex" wrap="nowrap" gutter="2" className="login" style={{top: `${deviceUtil.getNavigationBarHeight() + 60}rpx`}}>
            <Col span="4">
                <div className="flex-content">您好！</div>
            </Col>
            <Col span="20">
                {<div className="flex-content">云南某某有限公司</div>}
            </Col>
        </Row>
      </capsule-bar>
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
