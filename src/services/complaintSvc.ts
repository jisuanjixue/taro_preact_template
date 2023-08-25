import request from "../utils/httpRequest/index";
import { ComplaintData } from "../data-types/complaint";
import { IResponseListData, IResponseData } from "../data-types/response";

const routePrefix = "/complaint";

const postComplaint = (data: ComplaintData.IComplaintSave) => request.post(`${routePrefix}`, data);
const getComplaintPublish = (keyword: string, areaCode: string, areaLevel: string, page: number, rows: number) =>
  request.get<IResponseListData<ComplaintData.IComplaintPublish>>(
    `${routePrefix}/publish?keyword=${keyword}&areaCode=${areaCode}&areaLevel=${areaLevel}&page=${page}&rows=${rows}`
  );
const getComplaintPublishDetail = (id: string) =>
  request.get<IResponseData<ComplaintData.IComplaintPublishDetail>>(`${routePrefix}/publish/detail/${id}`);

const geStatics = () => request.get<IResponseListData<ComplaintData.IStatics>>(`${routePrefix}/statics`);
const myComplaint = (params) =>
  request.get<ComplaintData.IComplaint>(`${routePrefix}/my?status=${params.status}&page=${params.page}&rows=${params.rows}`);

const getDetail = (id: string) => request.get<IResponseData<ComplaintData.IComplaintDetail>>(`${routePrefix}/${id}`);
const postReview = (data: ComplaintData.IReview) => request.post(`${routePrefix}/review`, data);

export default { postComplaint, getComplaintPublish, geStatics, myComplaint, getDetail, getComplaintPublishDetail, postReview };
