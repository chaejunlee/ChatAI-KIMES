import { EntityId } from "@reduxjs/toolkit";

export type BasicResponseMessageType =
	| ContentResponseMessageType
	| ImageResponseCardType;

export interface ResponseMessageType {
	content: BasicResponseMessageType[];
	type: "response";
}

export interface ContentResponseMessageType {
	contentType: "PlainText";
	content: string;
}

export interface ImageResponseCardType {
	contentType: "ImageResponseCard";
	imageResponseCard: imageResponseCardContentType;
}

export interface imageResponseCardContentType {
	buttons: ButtonResponseType[] | EntityId[];
	imageUrl?: string;
	subtitle?: string;
	title?: string;
}

export interface ButtonResponseType {
	text: string;
	value: string;
}
