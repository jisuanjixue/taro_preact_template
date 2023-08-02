declare namespace WeixinData {
    interface IDecryptDataRequest {
        iv: string;
        encryptedData: string;
        openId: string;
    }
}

export default WeixinData;
