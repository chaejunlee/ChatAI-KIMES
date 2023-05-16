import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";

export const errorMessage: ContentResponseMessageType[] = [
	{
		contentType: "PlainText",
		content: "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
	},
];

export const pleaseWaitErrorMessage: ContentResponseMessageType[] = [
	{
		contentType: "PlainText",
		content: "이전 요청이 아직 처리 중입니다. 잠시만 기다려주세요.",
	},
];

export const abortErrorMessage: ContentResponseMessageType[] = [
	{
		contentType: "PlainText",
		content: "이전 요청이 취소되었습니다.",
	},
];
