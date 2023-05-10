import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useState,
} from "react";
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

interface LoadingContextInterface {
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export const CardContext = createContext<CardContextInterface | null>(null);
export const LoadingContext = createContext<LoadingContextInterface | null>(
	null
);

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([introMessage]);
	const [loading, setLoading] = useState<boolean>(false);

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
		<LoadingContext.Provider value={{ loading, setLoading }}>
			<CardContext.Provider value={{ onCardButtonClick }}>
				<Conversation messages={messages} />
				<MessageInput onClick={addMessage} />
			</CardContext.Provider>
		</LoadingContext.Provider>
	);
}
