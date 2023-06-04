import { EntityId } from "@reduxjs/toolkit";
import RequestMessageType from "./RequestMessageType";
import { ResponseMessageType } from "./ResponseMessageType";

export type Message = RequestMessageType | ResponseMessageType;

export type WithId<T> = { id: EntityId } & T;
