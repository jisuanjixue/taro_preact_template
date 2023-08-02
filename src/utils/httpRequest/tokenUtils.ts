import Taro from "@tarojs/taro";
import { UserData } from "@/data-types/user";

const keyToken = "token";
const keyToOpenId = "openId";

type TToken = UserData.IUserLoginResponse | undefined;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setToken = (token: TToken) => {
  global[keyToken] = token;

  Taro.setStorageSync(keyToken, token);
};

const setOpenId = (openId: string) => {
  Taro.setStorageSync(keyToOpenId, openId);
};

// eslint-disable-next-line consistent-return
const getToken = (): TToken => {
  if (global[keyToken]) return global[keyToken];

  try {
    ({ data: global[keyToken] } = Taro.getStorageSync(keyToken));
    if (global[keyToken]) {
      return global[keyToken];
    }
  } catch (e) {
    return undefined;
  }
};

const isAuthorized = (): boolean => {
  const token = getToken();
  return token?.accessToken ? true : false;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const clear = () => {
  global[keyToken] = undefined;
  Taro.clearStorageSync();
};

export default { setToken, getToken, clear, isAuthorized, setOpenId };
