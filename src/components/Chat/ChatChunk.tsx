import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import { selectMessageById } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import { errorMessage } from "../../utils/Message/errorMessageContent";
import { RequestChat } from "./Request/RequestChat";
import ContentResponseMessage from "./Response/ContentResponseMessage";
import { ResponseChat } from "./Response/ResponseChat";
import { ResponseChatChunk } from "./Response/ResponseChatChunk";

export function ChatChunk({ messageId }: { messageId: EntityId }) {
	const message = useAppSelector((state) =>
		selectMessageById(state, messageId)
	);

	if (!message)
		return (
			<ContentResponseMessage
				key={"message-error"}
				message={errorMessage as unknown as ContentResponseMessageType}
			/>
		);

	switch (message.type) {
		case "request":
			return <RequestChat message={message} />;
		case "response":
			return (
				<ResponseChat>
					<ResponseChatChunk messageId={messageId} />
				</ResponseChat>
			);
	}
}

export default memo(ChatChunk);
