import { useCallback } from "react";
import Header from "./Layout/Header";
import Conversation from "./components/Conversation";
import MessageInput from "./components/MessageInput";
import { SendRequestContext } from "./hooks/Request/SendRequestContext";
import { createRequest } from "./utils/Request/createRequest";
import useRequest from "./hooks/Request/useRequest";

function App() {
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
			<Header />
			<Conversation messages={messages} />
			<MessageInput onClick={addResponseMessage} />
		</SendRequestContext.Provider>
	);
}

export default App;
