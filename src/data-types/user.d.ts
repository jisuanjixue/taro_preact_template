import { IBaseView } from "./ base";

declare namespace UserData {
    interface IBase {
        /**页码*/
        page: number;
        /**每页数**/
        rows: number;
        /**排序，number最新、1最热，2时间正序、3时间倒序（默认时间正序）**/
        // sort: number;
    }
 
    interface ICurrentUser extends IBaseView {
        departmentId?: string | undefined;
        name: string;
        phoneNumber: string;
        gender: string;
    }
    interface IRegister {
        phoneNumber: string;
        code: string;
    }

    interface IUserLoginResponse {
        accessToken: string;
        refreshToken: string;
    }

    interface GetByIdResposne extends IBaseView {
        userName: string;
    }

    interface IDecrypt {
        encryptedData: string;
        iv: string;
    }
    interface IUserPhone {
        phoneNumber: string;
    }

    interface IStatics {
        total: number;
        normalReportQuantity: number;
        inNormalReportQuantity: number;
    }
}
