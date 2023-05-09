import Message from "./Message";

export interface BasicResponseMessageType {
	//aws lex response message content type
	contentType: string;
}

export interface ResponseMessageType extends Message {
	content: BasicResponseMessageType[];
	type: "response";
}

export interface ContentResponseMessageType extends BasicResponseMessageType {
	contentType: "PlainText";
	content: string;
}

export interface ImageResponseCardType extends BasicResponseMessageType {
	contentType: "ImageResponseCard";
	imageResponseCard: imageResponseCardContentType;
}

export interface imageResponseCardContentType {
	buttons: ButtonResponseType[];
	imageUrl?: string;
	subtitle?: string;
	title?: string;
}

export interface ButtonResponseType {
	text: string;
	value: string;
}
