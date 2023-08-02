import { IBaseView } from "./response";

declare namespace BannerData {

  interface IBannerView extends IBaseView {
    title: string;
    preview: string,
    sourceId: string,
    source: string,
    sort: number
  }
}
