import Message from "../../Interface/Message/Message";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import { ResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import { RequestChat } from "./Request/RequestChat";
import { ResponseChatChunk } from "./Response/ResponseChatChunk";

export function ChatChunkContent({
	message,
	messageID,
}: {
	message: Message;
	messageID: string;
}) {
	switch (message.type) {
		case "request":
			return <RequestChat message={message as RequestMessageType} />;
		case "response":
			return (
				<ResponseChatChunk
					message={message as ResponseMessageType}
					messageID={messageID}
				/>
			);
	}
}
