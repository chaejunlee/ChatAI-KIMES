import React from "react";
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

function appendResponseOnly(
	text: string,
	setLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
	setMessages: (
		value: ((prevState: Message[]) => Message[]) | Message[]
	) => void,
	messages: Message[]
) {
	requestLexResponse(text)
		.then((response) => {
			setLoading(false);
			const data: ResponseMessageType = {
				type: "response",
				content: response.data,
			};
			setMessages([...messages, data]);
		})
		.catch((error) => {
			setLoading(false);
			const errorResponseMessage: ResponseMessageType = {
				type: "response",
				content: [
					{
						contentType: "PlainText",
						content:
							"Sorry, I am not able to understand you. Please try again.",
					} as ContentResponseMessageType,
				],
			};
			setMessages([...messages, errorResponseMessage]);
		});
}

function appendRequestOnly(
	message: string,
	setLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
	setMessages: (
		value: ((prevState: Message[]) => Message[]) | Message[]
	) => void,
	messages: Message[],
	createRequestMessage: (message: string) => RequestMessageType
) {
	requestLexResponse(message)
		.then((response) => {
			setLoading(false);
			const data: ResponseMessageType = {
				type: "response",
				content: response.data,
			};
			setMessages([...messages, createRequestMessage(message), data]);
		})
		.catch((error) => {
			setLoading(false);
			const errorResponseMessage: ResponseMessageType = {
				type: "response",
				content: [
					{
						contentType: "PlainText",
						content:
							"Sorry, I am not able to understand you. Please try again.",
					} as ContentResponseMessageType,
				],
			};
			setMessages([
				...messages,
				createRequestMessage(message),
				errorResponseMessage,
			]);
		});
}

export default function ChatPage() {
	const [messages, setMessages] = React.useState<Message[]>([introMessage]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const createRequestMessage = (message: string) => {
		return {
			message: message,
			type: "request",
			userId: window.navigator.userAgent,
		} as RequestMessageType;
	};

	const addMessage = (message: string) => {
		setLoading(true);
		setMessages([...messages, createRequestMessage(message)]);
		requestLexResponse(message)
			.then((response) => {
				setLoading(false);
				const data: ResponseMessageType = {
					type: "response",
					content: response.data,
				};
				setMessages([...messages, createRequestMessage(message), data]);
			})
			.catch((error) => {
				setLoading(false);
				const errorResponseMessage: ResponseMessageType = {
					type: "response",
					content: [
						{
							contentType: "PlainText",
							content:
								"Sorry, I am not able to understand you. Please try again.",
						} as ContentResponseMessageType,
					],
				};
				setMessages([
					...messages,
					createRequestMessage(message),
					errorResponseMessage,
				]);
			});
	};
	return (
		<Grid container direction="column">
			<CommunicationDisplay loading={loading} messages={messages} />
			<MessageInput loading={loading} onClick={addMessage} />
		</Grid>
	);
}
