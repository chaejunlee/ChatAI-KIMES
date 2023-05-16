import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";

export const createResponse = (content: BasicResponseMessageType[]) => {
	return {
		content: content,
		type: "response",
	} as ResponseMessageType;
};

export const createResponseContent = (
	message: string
): ContentResponseMessageType[] => {
	return [
		{
			contentType: "PlainText",
			content: message,
		},
	];
};
