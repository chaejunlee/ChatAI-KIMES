import React, { createContext } from "react";
import { introMessage } from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import Conversation from "../../components/Conversation";
import MessageInput from "../../components/MessageInput";
import { addResponse } from "./addResponse";

const createRequest = (message: string) => {
	return {
		message: message,
		type: "request",
		userId: window.navigator.userAgent,
	} as RequestMessageType;
};

interface CardContextInterface {
	onCardButtonClick: (text: string) => Promise<void>;
}

export const CardContext = createContext<CardContextInterface | null>(null);

export default function ChatPage() {
	const [messages, setMessages] = React.useState<Message[]>([introMessage]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const onCardButtonClick = async (text: string) => {
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
		<CardContext.Provider value={{ onCardButtonClick }}>
			<Conversation loading={loading} messages={messages} />
			<MessageInput loading={loading} onClick={addMessage} />
		</CardContext.Provider>
	);
}
