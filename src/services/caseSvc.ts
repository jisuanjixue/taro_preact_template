import request from "../utils/httpRequest/index";
import { CaseData } from "../data-types/case";
import { IResponseListData } from "../data-types/response";

const routePrefix = "/typical-case";
console.log(request)
const getTypicalCase = (keyword: string, page: number, rows: number) =>
  request.get<IResponseListData<CaseData.ICaseView>>(`${routePrefix}/list?keyword=${keyword}&page=${page}&rows=${rows}`);

export default { getTypicalCase };
