import request from "../utils/httpRequest/index";
import { BannerData } from "../data-types/banner";
import { IResponseListData } from "../data-types/response";

const routePrefix = "/api/index-banner";

const getList = () => request.get<IResponseListData<BannerData.IBannerView>>(`${routePrefix}/list`);

export default { getList };