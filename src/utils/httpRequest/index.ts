// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Taro, { getCurrentPages } from "@tarojs/taro";
import tokenUtils from "./tokenUtils";
import host from "./apiConfig";
import mem from "mem";
import authSvc from "@/services/authSvc";

type Result<T> = {
    code: number;
    message: string;
    result: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance;
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = { baseURL: `${host.api.baseUrl}`, timeout: 60000 };

    constructor(config: AxiosRequestConfig) {
        // 使用axios.create创建axios实例
        this.instance = axios.create(Object.assign(this.baseConfig, config));

        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // 一般会请求拦截里面加token，用于后端的验证
                const token = tokenUtils.getToken();
                if (token) {
                    config.headers = {
                        ...config.headers,
                        authorization: `Bearer ${token.accessToken}`,
                    };
                }
                if (config.url) {
                    if (!config.url.startsWith("http")) {
                        if (config.url.startsWith("/api/")) config.url = config.url.replace("/api/", "/");
                        else if (config.url.startsWith("/file_api/")) config.url = config.url.replace("/file_api/", "/");
                    }
                }
                return config;
            },
            (err: any) => {
                // 请求错误，这里可以用全局提示框进行提示
                Taro.showToast({
                    title: `${err}`,
                    icon: 'error',
                    duration: 2000
                })
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                // 直接返回res，当然你也可以只返回res.data
                // 系统如果有自定义code也可以在这里处理
                return res.data;
            },
            async (error: any) => {
                console.log("🚀 ~ file: index.ts:59 ~ Request ~ error:", error)
                const refreshTokenFn = async () => {
                    const token = tokenUtils.getToken();
                    try {
                        const response = await this.instance.post("/market-subject/refresh-token", { token });
                        const session = response.data;

                        if (!session?.accessToken) {
                            tokenUtils.clear()
                        }
                        tokenUtils.setToken(token)
                        return session;
                    } catch (error) {
                        tokenUtils.clear()
                    }
                };

                const maxAge = 10000;
                const memoizedRefreshToken = mem(refreshTokenFn, {
                    maxAge,
                });
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const result = await memoizedRefreshToken();
                    if (result?.accessToken) {
                        config.headers = {
                            ...config.headers,
                            authorization: `Bearer ${result?.accessToken}`,
                        };
                    }
                    return this.instance(originalRequest);
                }
                if (error.response.status === 401) {
                    Taro.showActionSheet({
                        itemList: ['个人登录', '法人登录'],
                        success: async (res) => {
                            const type = res.tapIndex === 0 ? "个人" : "法人";
                            const result = await authSvc.getAccessToken(type);
                            const pages = getCurrentPages();
                            const currentPage = pages[pages.length - 1];
                            const url = currentPage.route;
                            if (result.success) {
                                Taro.showToast({
                                    title: "登录成功",
                                    icon: "success",
                                    duration: 2000
                                });
                                Taro.reLaunch({
                                    url: `/${url}`
                                });
                            } else {
                                Taro.navigateTo({
                                    url: `/packageA/pages/register/register?openId=${result.data.weixinOpenId}`
                                });
                            }
                        },
                        fail: function (res) {
                            console.log(res.errMsg)
                        }
                    })
                }
                // 这里用来处理http常见错误，进行全局提示
                let message = "";
                switch (error.response.status) {
                    case 400:
                        message = "请求错误(400)";
                        break;
                    case 401:
                        message = "未授权，请重新登录(401)";
                        // 这里可以做清空storage并跳转到登录页的操作
                        break;
                    case 403:
                        message = "拒绝访问(403)";
                        break;
                    case 404:
                        message = "请求出错(404)";
                        break;
                    case 408:
                        message = "请求超时(408)";
                        break;
                    case 500:
                        message = "服务器错误(500)";
                        break;
                    case 501:
                        message = "服务未实现(501)";
                        break;
                    case 502:
                        message = "网络错误(502)";
                        break;
                    case 503:
                        message = "服务不可用(503)";
                        break;
                    case 504:
                        message = "网络超时(504)";
                        break;
                    case 505:
                        message = "HTTP版本不受支持(505)";
                        break;
                    default:
                        message = `连接出错(${error.response.status})!`;
                }
                // 这里错误消息可以使用全局弹框展示出来
                // 比如element plus 可以使用 ElMessage
                Taro.showToast({
                    title: `${message}`,
                    icon: 'error',
                    duration: 2000
                })
                // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
                return Promise.reject(error.response)
            }
        );
    }

    // 定义请求方法
    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.request(config);
    }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.get(url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.post(url, data, config);
    }

    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.put(url, data, config);
    }

    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<Result<T>>> {
        return this.instance.delete(url, config);
    }
}

// 默认导出Request实例
export default new Request({})