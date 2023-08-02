import Taro from "@tarojs/taro";

interface Screen {
  model: string;
  system: string;
  windowHeight: number;
  statusBarHeight?: number;
}

// getCenterHeight 获取中间区域的高度
export function getCenterHeight(): number {
  const { model, system, windowHeight, statusBarHeight }: Screen =
    Taro.getSystemInfoSync();
  let navBarHeight = 48;
  const statusBarHeightNum = statusBarHeight || 0;
  if (/iPhone/.test(model) && /iOS/.test(system)) {
    navBarHeight = 44;
  }
  return windowHeight - statusBarHeightNum - navBarHeight;
}

// getScreenWidth 获取屏幕宽度
export function getScreenWidth(): number {
  const { screenWidth } = Taro.getSystemInfoSync();
  return screenWidth;
}

// getTopNarHeight 获取头部导航的高度
export function getTopNarHeight(): number {
  const { model, system, statusBarHeight } = Taro.getSystemInfoSync();
  let navBarHeight = 48;
  const statusBarHeightNum = statusBarHeight || 0;
  if (/iPhone/.test(model) && /iOS/.test(system)) {
    navBarHeight = 44;
  }
  return statusBarHeightNum + navBarHeight;
}

/**
 * 将px转换为rpx
 * @param num number 数值
 */
export const convertPxToRpx = (num: number) => {
  const { windowWidth } = Taro.getSystemInfoSync();
  return num * (750 / windowWidth);
};

/**
 * 将rpx转换为px
 * @param num number 数值
 */
export const convertRpxToPx = (num: number) => {
  const { windowWidth } = Taro.getSystemInfoSync();
  return num / (750 / windowWidth);
};
