import React, { Dispatch, SetStateAction } from "react";
import MessageInput from "../../components/MessageInput";
import CommunicationDisplay from "../../components/CommunicationDisplay";
import Message from "../../Interface/Message/Message";
import { introMessage } from "../../Data/Message";
import requestLexResponse from "../../api/LexRequest";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import { Grid, Stack } from "@mui/material";

const createRequest = (message: string) => {
	return {
		message: message,
		type: "request",
		userId: window.navigator.userAgent,
	} as RequestMessageType;
};

async function addResponse(
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

export default function ChatPage() {
	const [messages, setMessages] = React.useState<Message[]>([introMessage]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const onResponseCardButtonClick = async (text: string) => {
		setLoading(true);
		await addResponse(text, setMessages);
		setLoading(false);
	};

	const addMessage = async (message: string) => {
		setLoading(true);
		setMessages([...messages, createRequest(message)]);
		await addResponse(message, setMessages);
		setLoading(false);
	};

	return (
		<>
			<Grid
				container
				direction="column"
				flexGrow={"1"}
				overflow={"scroll"}
				style={{ WebkitOverflowScrolling: "touch" }}
			>
				<CommunicationDisplay
					loading={loading}
					messages={messages}
					onButtonClick={onResponseCardButtonClick}
				/>
			</Grid>
			<MessageInput loading={loading} onClick={addMessage} />
		</>
	);
}
