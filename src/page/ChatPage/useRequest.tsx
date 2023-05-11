import { Dispatch, SetStateAction, useState } from "react";
import Message from "../../Interface/Message/Message";
import requestLexResponse from "../../api/LexRequest";
import {
	ContentResponseMessageType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import { introMessage } from "../../Data/Message";

const errorMessage: ContentResponseMessageType[] = [
	{
		contentType: "PlainText",
		content: "Sorry, I am not able to understand you. Please try again.",
	},
];

const pleaseWaitErrorMessage: ContentResponseMessageType[] = [
	{
		contentType: "PlainText",
		content: "이전 요청이 아직 처리 중입니다. 잠시만 기다려주세요.",
	},
];

const abortErrorMessage: ContentResponseMessageType[] = [
	{
		contentType: "PlainText",
		content: "이전 요청이 취소되었습니다.",
	},
];

let abortController: AbortController | null = null;

async function addResponse(
	text: string,
	setMessages: Dispatch<SetStateAction<Message[]>>
) {
	let responseMessageContent: ContentResponseMessageType[] = [];
	if (abortController) {
		abortController.abort();
	}
	abortController = new AbortController();

	try {
		const response = await requestLexResponse(text, abortController);

		responseMessageContent = response.data as ContentResponseMessageType[];
	} catch (e: any) {
		if (e.name === "CanceledError") {
			responseMessageContent = abortErrorMessage;
		} else {
			responseMessageContent = errorMessage;
		}
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
		if (loading) {
			setMessages((messages) => [
				...messages,
				{
					type: "response",
					content: pleaseWaitErrorMessage,
				},
			]);
			return;
		}
		setLoading(true);
		await addResponse(message, setMessages);
		setLoading(false);
	};

	return { messages, setMessages, loading, sendRequest };
}
