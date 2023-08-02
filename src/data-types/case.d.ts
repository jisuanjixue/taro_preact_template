import { IBaseView } from "./response";

declare namespace CaseData {
  interface IAttachments {
    fileName: string;
    fileExtension: string;
    fileUrl: string;
  }

  interface IItems {
    id: string;
    content: string;
    attachments: IAttachments[];
  }

  interface ICaseView extends IBaseView {
    title: string;
    summary: string;
    items: IItems[];
  }
}
