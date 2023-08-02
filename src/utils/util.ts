import Taro from "@tarojs/taro";


/*获取当前页url*/
const getCurrentPageUrl = (): string => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage.route as string;
};

const isType = (data: any, type: string): boolean => {
  const typeObj = {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Function]": "function",
    "[object Date]": "date", // Object.prototype.toString.call(new Date())
    "[object RegExp]": "regExp",
    "[object Map]": "map",
    "[object Set]": "set",
    "[object HTMLDivElement]": "dom", // document.querySelector('#app')
    "[object WeakMap]": "weakMap",
    "[object Window]": "window", // Object.prototype.toString.call(window)
    "[object Error]": "error", // new Error('1')
    "[object Arguments]": "arguments"
  };

  const name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
  const typeName = typeObj[name] || "未知类型"; // 匹配数据类型
  return typeName === type; // 判断该数据类型是否为传入的类型
};

const hasKey = <T>(key: keyof T, obj: T) => {
  if (typeof obj !== "object") return false;

  if (obj instanceof Array) return false;

  return Object.keys(obj).some(k => k === key);
};

const isNullOrEmpty = (value?: string) => [undefined, null, ""].some(val => val === value);

const splitToArray = (value: string | undefined, splitter = ","): string[] => {
  if (isNullOrEmpty(value)) return [];

  return value?.split(splitter) || [];
};

export default {
  splitToArray,
  hasKey,
  getCurrentPageUrl,
  isType
};
