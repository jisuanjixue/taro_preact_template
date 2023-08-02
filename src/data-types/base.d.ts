export interface IResponse {
    success: boolean;
    errorCode: number;
    errorMessage?: string;
}

export interface IResponseData<T> extends IResponse {
    data?: T;
}

export type IResponseListData<T> = IResponseData<T[]>;

export interface IBaseView {
    id?: string;
}

export interface ISelectListItem {
    value: any;
    text: string;
}

export interface ITreeNode<T> {
    item: T;
    children?: ITreeNode<T>[];
}
