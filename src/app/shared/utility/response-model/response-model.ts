
export interface ResponseModel {
    message: string;
    data: any;
    status: number;
}

export interface ErrorResponseModel {
    message: string;
    error: string;
    httpStatus: string;
    time: number;
}
