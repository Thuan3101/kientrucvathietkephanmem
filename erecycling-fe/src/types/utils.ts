import React from "react"

export type MenuItem = {
    title: string,
    list: Array<{
        label: string,
        path: string,
        icon: React.ReactNode,
    }>
}

export interface GeneralApiResponse<T>  {
    message: string;
    status: number;
    data?: T;
}

export interface PageResponse<T> extends GeneralApiResponse<T> {
    sort?: any,
    pageSize?: number,
    pageNumber?: number, 
    totalElements?: number,
    totalPages?: number,
    empty?: boolean,
    hasNext?: boolean,
    hasPrevious?: boolean
}

export type GetQueryParams = {
    orders: string,
    searchText: string,
    pageSize: number,
    pageIndex: number   
}

export class AppError extends Error {
    status: number;
    statusCode: string;
    constructor(status: number, statusCode: string, message: string) {
        super(message);
        this.status = status;
        this.name = "App Error";
        this.statusCode = statusCode;
    }
}