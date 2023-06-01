import RequestMessageType from "./RequestMessageType";
import { ResponseMessageType } from "./ResponseMessageType";

export type Message = RequestMessageType | ResponseMessageType;

export type MessageWithId = { id: string } & Message;
