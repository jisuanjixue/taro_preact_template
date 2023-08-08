import { IBaseView } from "./response";

declare namespace ComplaintData {
  interface IComplaintAttachments {
    id: string;
    fileName: string;
    fileExtension: string;
    fileUrl: string;
  }
  interface IReview {
    complaintId: string;
    reviewScore: number;
    tagIds: string;
  }

  interface ITags {
    id: string;
    title: string;
  }

  interface IComplaintSave extends IBaseView {
    area: {
      provinceId: string;
      provinceName: string;
      cityId: string;
      cityName: string;
      districtId: string;
      districtName: string;
      streetId: string;
      streetName: string;
    };
    title: string;
    typicalCaseItemId: string;
    administrativeSubjectId: string;
    content: string;
    attachmentIds: string[];
  }

  interface saveComplaintResponse {
    data?: string;
  }

  interface IComplaintPublish extends IBaseView {
    marketSubjectName: string;
    complaintNumber: string;
    title: string;
    disposalDepartmentName: string;
    disposalTime: Date;
  }

  interface IHandling {
    id: string;
    name: string;
    handler: string;
    handleTime: Date;
    opinion: string;
    remark: string;
  }
  interface IComplaintPublishDetail extends IBaseView {
    title: string;
    content: string;
    complaintTime: Date;
    area: {
      provinceId: string;
      provinceName: string;
      cityId: string;
      cityName: string;
      districtId: string;
      districtName: string;
      streetId: string;
      streetName: string;
    };
    administrativeSubjectName: string;
    attachments: IComplaintAttachments[];
    complaintNumber: string;
    disposal: {
      id: string;
      disposalDepartmentId: string;
      disposerName: string;
      disposalTime: Date;
      disposalAttachments: IComplaintAttachments[];
      disposalTypeName: string;
    };
    handling: IHandling[];
  }
  interface IStatics {
    status: number;
    amount: number;
  }

  interface IComplaint extends IBaseView {
    complaintTime: Date;
    administrativeSubjectName: string;
    status: number;
  }

  interface IComplaintDetail extends IBaseView {
    content: string;
    area: {
      provinceId: string;
      provinceName: string;
      cityId: string;
      cityName: string;
      districtId: string;
      districtName: string;
      streetId: string;
      streetName: string;
    };
    administrativeSubjectName: string;
    typicalCaseItemTitle: string;
    attachments: IComplaintAttachments[];
    // reviewScore: number;
    // reviewTime: Date;
    handling: IHandling[];
    disposal: {
      id: string;
      disposalDepartmentId: string;
      disposerName: string;
      disposalTime: Date;
      disposalAttachments: IComplaintAttachments[];
      disposalTypeName: string;
    };
    review: {
      id: string;
      reviewScore: number;
      reviewTime: Date;
      reviewDescription: string;
      tags: ITags[];
    };
    reviewRectification: {
      id: string;
      correctUserName: string;
      correctOpinion: string;
      correctDeadline: Date;
      correctTime: Date;
      isDelay: string;
    };
  }
}
