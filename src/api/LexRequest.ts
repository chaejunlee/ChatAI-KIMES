import axios, {AxiosResponse} from "axios";
import {ResponseMessageType} from "../Interface/Message/ResponseMessageType";

export default function requestLexResponse(
    message: string
): Promise<AxiosResponse<ResponseMessageType,ResponseMessageType>> {
    return axios.post<ResponseMessageType>('/api/test', {
        message: message,
        userId: window.navigator.userAgent
    })
}