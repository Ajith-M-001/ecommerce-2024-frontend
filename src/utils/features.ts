import { MessageResponse } from "../types/api-types"
import { FetchBaseQueryError, } from '@reduxjs/toolkit/query'
import {SerializedError} from '@reduxjs/toolkit'
import { NavigateFunction } from "react-router-dom";
import { toast } from 'react-hot-toast'
import moment from 'moment';

type resType = {
    data: MessageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
}

export const responseToast = (res:resType, navigate:NavigateFunction |  null, url:string) => {
    if ("data" in res) {
        toast.success(res.data.message)
        if (navigate) {
            navigate(url)
        }
    } else {
        const error = res.error as FetchBaseQueryError;
        const messageResponse = error.data as MessageResponse;
        toast.error(messageResponse.message)
    }
}

export const getLastMonth = () => {
    const currentDate = moment();

    currentDate.date(1);

    const last6Month:string[] =[]
    const last12Month: string[] = []
    
    for (let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i,"months");
        const monthName = monthDate.format("MMMM");
        last6Month.unshift(monthName)
    }
    for (let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i,"months");
        const monthName = monthDate.format("MMMM");
        last12Month.unshift(monthName)
    }

    return {
        last12Month,
        last6Month
    }
}