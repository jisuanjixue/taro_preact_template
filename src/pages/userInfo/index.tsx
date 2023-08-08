import './index.less'
import { h } from 'preact';
import complaintSvc from "@/services/complaintSvc";
import { useRequest } from 'ahooks';
import { Tabs } from '@nutui/nutui-react-taro';
import { useSignal, useSignalEffect } from '@preact/signals';

const Userinfo = () => {
  const tabValue = useSignal<string>("研判中")
  const pageNation = useSignal<{page: number, rows: number}>({page: 1, rows: 15})
  const lists = useSignal([])
  const { loading, run } = useRequest(complaintSvc.myComplaint, {
    manual: true,
    defaultParams: [{ status: "研判中", page: 1, rows: 15 }],
    onSuccess: (res) => {
      lists.value = res.data.data
    }
  })

  useSignalEffect(() => {
    run({status: tabValue.value, page: pageNation.value.page, row: pageNation.value.rows})
  })

  return (
    <div className='userInfo'>
      <Tabs
        defaultValue='研判中'
        value={tabValue.value}
        tabStyle={{ position: 'sticky', top: '0px', zIndex: 11 }}
        onChange={(value: string) => tabValue.value = value}
      >
        <Tabs.TabPane title="研判中" value="研判中"></Tabs.TabPane>
        <Tabs.TabPane title="处置中" value="处置中"></Tabs.TabPane>
        <Tabs.TabPane title="待评价" value="待评价"></Tabs.TabPane>
        <Tabs.TabPane title="已关闭" value="已关闭"></Tabs.TabPane>
      </Tabs>

    </div>
  )
}

export default Userinfo;
