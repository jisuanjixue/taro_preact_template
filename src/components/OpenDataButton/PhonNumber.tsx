import { ButtonProps, CommonEventFunction } from "@tarojs/components";
import {useEffect } from "preact/compat"
import { Button } from "@nutui/nutui-react-taro";
import useOpenData from "./useOpenData";
import Taro from "@tarojs/taro";
import { h } from "preact";

interface IDecrpytData {
  phoneNumber: string;
  purePhoneNumber: string;
}

interface IProps {
  onGet: (detail: IDecrpytData | undefined) => void;
}

export default (props: IProps) => {
  const openData = useOpenData<IDecrpytData>();
  const onGetPhoneNumber: CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail> = ({ detail }) => {
    if (detail.errMsg.indexOf(":ok") === -1) {
      Taro.showToast({ title: "拒绝申请，无法获取电话号码", icon: "none" });
      return;
    }

    openData.decrypt(detail);
  };

  useEffect(() => {
    props.onGet(openData.decryptedData);
  }, [openData.decryptedData]);

  return (
    <Button
      type="primary"
      openType="getPhoneNumber"
      onGetPhoneNumber={onGetPhoneNumber}
      size="large"
      shape="round"
      className="w-120"
      loading={openData.loading}
    >
      确定
    </Button>
  );
};
