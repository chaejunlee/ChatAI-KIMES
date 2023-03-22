import axios, {AxiosResponse} from "axios";
import {BasicResponseMessageType, ResponseMessageType} from "../Interface/Message/ResponseMessageType";

export default function requestLexResponse(
    message: string
): Promise<AxiosResponse<BasicResponseMessageType[],any>> {
    return axios.post<BasicResponseMessageType[]>('/test/api', {
        message: message,
        userId: "user1"
    })
}