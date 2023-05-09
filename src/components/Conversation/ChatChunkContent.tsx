import Message from "../../Interface/Message/Message";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import { ResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import { RequestChat } from "./Request/RequestChat";
import { ResponseChatChunk } from "./Response/ResponseChatChunk";

export function ChatChunkContent({
	message,
	onButtonClick,
	messageIndex,
}: {
	message: Message;
	onButtonClick: (text: string) => void;
	messageIndex: number;
}) {
	switch (message.type) {
		case "request":
			return <RequestChat message={message as RequestMessageType} />;
		case "response":
			return (
				<ResponseChatChunk
					message={message as ResponseMessageType}
					onButtonClick={onButtonClick}
					messageIndex={messageIndex}
				/>
			);
	}
}
