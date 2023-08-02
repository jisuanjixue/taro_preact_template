let baseUrlPrefix = "";
// const hostApi = 'http://10.0.2.2:5004';
// const hostApiDev = "https://qjmobile-api.longdanet.com";
const hostApiDev = "http://36.147.22.110:8082";
// const hostApiDev = "https://r03vcjbe-kusoft.mock.coding.io";
const hostApiProd = "http://36.147.22.110:8082";
const file = "https://qjmobile-api.longdanet.com";

const env = process.env.NODE_ENV === "development" ? "development" : "production";
switch (env) {
  case "development":
    baseUrlPrefix = hostApiDev;
    break;
  case "production":
    baseUrlPrefix = hostApiProd;
    break;
}

const api = {
  baseUrl: baseUrlPrefix,
  fileUrl: file
  //其他相关变量
};

export default { api, file };
