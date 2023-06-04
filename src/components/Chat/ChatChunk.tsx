import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { selectMessageById } from "../../store/message/messageSlice";
import store from "../../store/store";
import { useSmoothScrollToBottom } from "../../utils/chat";
import { RequestChat } from "./Request/RequestChat";
import { ResponseChat } from "./Response/ResponseChat";
import { ResponseChatChunk } from "./Response/ResponseChatChunk";

export function ChatChunk({ messageId }: { messageId: EntityId }) {
	const message = selectMessageById(store.getState(), messageId)!;
	const divRef = useSmoothScrollToBottom();

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
