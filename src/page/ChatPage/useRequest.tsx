import { Dispatch, SetStateAction, useState } from "react";
import Message from "../../Interface/Message/Message";
import requestLexResponse from "../../api/LexRequest";
import {
	ContentResponseMessageType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import { introMessage } from "../../Data/Message";

const errorMessage = [
	{
		contentType: "PlainText",
		content: "Sorry, I am not able to understand you. Please try again.",
	},
] as ContentResponseMessageType[];

async function addResponse(
	text: string,
	setMessages: Dispatch<SetStateAction<Message[]>>
) {
	let responseMessageContent: ContentResponseMessageType[] = [];

	try {
		const response = await requestLexResponse(text);

		responseMessageContent = response.data as ContentResponseMessageType[];
	} catch {
		responseMessageContent = errorMessage;
	}

	const reponseMessage: ResponseMessageType = {
		type: "response",
		content: responseMessageContent,
	};

	setMessages((messages) => [...messages, reponseMessage]);
}

export default function useRequest() {
	const [loading, setLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([introMessage]);

	const sendRequest = async (message: string) => {
		setLoading(true);
		await addResponse(message, setMessages);
		setLoading(false);
	};

	return { messages, setMessages, loading, sendRequest };
}
