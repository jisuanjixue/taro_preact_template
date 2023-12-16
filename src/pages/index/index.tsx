
import './index.less'
import { Fragment, h } from 'preact';
import { Button, Cell, Swiper, Image, Skeleton, Row, Col, SearchBar } from '@nutui/nutui-react-taro';
import host from '../../utils/httpRequest/apiConfig'
import navBarImage from '../../assets/images/homepagenav.png'
import deviceUtil from '../../utils/device-util.js'

import bannerSvc from '@/services/bannerSvc';
import { useRequest } from 'ahooks';
import { useSignal } from '@preact/signals';
// import { Close, Left, Share } from '@nutui/icons-react-taro';
// import Taro from '@tarojs/taro';

const Index = () => {
  const searchValue = useSignal("")
  const { data, loading } = useRequest(bannerSvc.getList)
  const intoSearch = () => {

  }

  const onSearchClick = () => { }



  return (
    <Fragment>
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
