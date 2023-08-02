import { useState } from "react";
import WeixinData from "@/data-types/weixin";
import weixinSvc from "@/services/weixinSvc";
import Taro from "@tarojs/taro";

export default <T>() => {
  const [decryptedData, setDecryptedData] = useState<T>();
  const [loading, setLoading] = useState<boolean>();
  const decrypt = async (encryptedData: WeixinData.IDecryptDataRequest) => {
    let data: T | undefined;
    setLoading(true);
    try {
      const openId = Taro.getStorageSync("openId");
      const res = await weixinSvc.decryptData({ ...encryptedData, openId: openId });
      data = JSON.parse(res.data || "") as T;
    } catch (e) {}
    setDecryptedData(data);
    setLoading(false);
  };

  return { decrypt, decryptedData, loading };
};
