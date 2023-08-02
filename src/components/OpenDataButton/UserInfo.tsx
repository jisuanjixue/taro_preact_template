import Taro from "@tarojs/taro";
import { Button } from "@tarojs/components";
import useOpenData from "./useOpenData";
import { h } from "preact";

interface IDecrpytData {
  phoneNumber: string;
  purePhoneNumber: string;
}

interface IProps {
  onGet: (detail: Taro.getUserProfile.SuccessCallbackResult | undefined) => void;
}

export default (props: IProps) => {
  const openData = useOpenData<IDecrpytData>();

  const getUserInfo = async () => {
    Taro.showLoading({ title: "加载中" });
    try {
      const detail = await Taro.getUserProfile({ desc: "获取用户信息" });
      props.onGet(detail);
    } catch (e) {}
    Taro.hideLoading();
  };

  return (
    <Button size="default" type="primary" loading={openData.loading} onClick={getUserInfo}>
      获取
    </Button>
  );
};
