import { Dispatch, SetStateAction } from "react";
import Message from "../../Interface/Message/Message";
import requestLexResponse from "../../api/LexRequest";
import {
	ContentResponseMessageType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";

export async function addResponse(
	text: string,
	setMessages: Dispatch<SetStateAction<Message[]>>
) {
	const data: ResponseMessageType = {
		type: "response",
		content: [] as ContentResponseMessageType[],
	};

	try {
		const response = await requestLexResponse(text);
		data.content = response.data as ContentResponseMessageType[];
	} catch {
		data.content = [
			{
				contentType: "PlainText",
				content: "Sorry, I am not able to understand you. Please try again.",
			},
		] as ContentResponseMessageType[];
	}

	setMessages((messages) => [...messages, data]);
}
