import React from 'react'

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace JSX {
  interface IntrinsicElements {
    'capsule-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> // replace 'any' with the actual type if available
  }
}
declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: "weapp" | "swan" | "alipay" | "h5" | "rn" | "tt" | "quickapp" | "qq" | "jd";
  }

  interface Global {
    // eslint-disable-next-line @typescript-eslint/ban-types
    globalData: object;

  }
}

declare const IS_H5: any;
declare const IS_WEAPP: any;
declare const IS_RN: any;
