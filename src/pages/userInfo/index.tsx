import './index.less'
import { Fragment, h } from 'preact';
import complaintSvc from "@/services/complaintSvc";
import { useRequest } from 'ahooks';
import { ConfigProvider, InfiniteLoading, Skeleton, Tabs, Toast } from '@nutui/nutui-react-taro';
import { batch, signal, useComputed, useSignal, useSignalEffect } from '@preact/signals';
import { IconFont } from '@nutui/icons-react-taro'
import './index.less'

const Userinfo = () => {
  const InfiniteUlStyle = {
    height: '400px',
    width: '100%',
    padding: '0',
    overflowY: 'auto',
    overflowX: 'hidden',
  }

  const InfiniteLiStyle = {
    marginTop: '20px',
    fontSize: '14px',
    color: 'rgba(100, 100, 100, 1)',
    textAlign: 'center',
  }

  const tabValue = useSignal<string>("研判中")
  const lists = useSignal([])
  const hasMore = useComputed(() => lists.value.length < total.value)
  const total = useSignal(0)
  // const hasMore = signal(true)
  const page = useSignal<number>(1)
  const { run } = useRequest(complaintSvc.myComplaint, {
    manual: true,
    defaultParams: [{ status: "研判中", page: 1, rows: 15 }],
    onSuccess: (res) => {
      const oldList = lists.value;
      batch(() => {
        lists.value = page.value === 1? res.data : [...oldList, ...res.data];
        total.value = res.total;
      })
    }
  })

  const loadMore = (done: () => void) => {
    if (hasMore) {
      page.value += 1
      //加载下一页
    }
    done();
  }
  const refresh = (done: () => void) => {
    setTimeout(() => {
      run({ status: tabValue.value, page: 1, rows: 15 })
      done()
    }, 1000)
  }

  useSignalEffect(() => {
    run({ status: tabValue.value, page: page.value, rows: 15 })
  })

  return (
    <div className='userInfo'>
      <Toast id="test" />
      <Tabs
        defaultValue='研判中'
        value={tabValue.value}
        tabStyle={{ position: 'sticky', top: '0px', zIndex: 11 }}
        onChange={(value: string) => {
          page.value = 1;
          tabValue.value = value
        }}
      >
        <Tabs.TabPane title="研判中" value="研判中"></Tabs.TabPane>
        <Tabs.TabPane title="处置中" value="处置中"></Tabs.TabPane>
        <Tabs.TabPane title="待评价" value="待评价"></Tabs.TabPane>
        <Tabs.TabPane title="已关闭" value="已关闭"></Tabs.TabPane>
      </Tabs>
      <div id="scroll" style={InfiniteUlStyle}>
        <InfiniteLoading
          pullingText={
            <Fragment>
              <IconFont name="Refresh" color="#888" />
              <span style={{ fontSize: '10px' }}>松开刷新</span>
            </Fragment>
          }
          loadingText={<ConfigProvider
            theme={{
              nutuiSkeletonLineBorderRadius: '10px',
            }}
          >
            <Skeleton rows={3} animated />
          </ConfigProvider>}
          loadMoreText="没有啦～"
          pullRefresh
          target="scroll"
          hasMore={hasMore.value}
          onLoadMore={loadMore}
          onRefresh={refresh}
        >

          {lists?.value?.map((item, index) => {
            return (
              <li key={index} style={InfiniteLiStyle}>
                {item.title}
              </li>
            )
          })}
        </InfiniteLoading>
      </div>
    </div>
  )
}

export default Userinfo;
