import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { selectMessageById } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import { ErrorMessage } from "./ErrorMessage";
import { RequestChat } from "./Request/RequestChat";
import { ResponseChat } from "./Response/ResponseChat";
import { ResponseChatChunk } from "./Response/ResponseChatChunk";

export function ChatChunk({ messageId }: { messageId: EntityId }) {
	const message = useAppSelector((state) =>
		selectMessageById(state, messageId)
	);

	if (!message) return <ErrorMessage />;

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
