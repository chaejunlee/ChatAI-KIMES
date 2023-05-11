import { useCallback, useState } from "react";
import Conversation from "../../components/Conversation";
import MessageInput from "../../components/MessageInput";
import useRequest from "./useRequest";
import { createRequest } from "./createRequest";
import { SendRequestContext } from "./SendRequestContext";

export default function ChatPage() {
	const { messages, setMessages, loading, sendRequest } = useRequest();

	const addResponseMessage = useCallback(
		(message: string) => {
			setMessages((messages) => [...messages, createRequest(message)]);
			sendRequest(message);
		},
		[setMessages, sendRequest]
	);

	return (
		<SendRequestContext.Provider value={{ loading, sendRequest }}>
			<Conversation messages={messages} />
			<MessageInput onClick={addResponseMessage} />
		</SendRequestContext.Provider>
	);
}
