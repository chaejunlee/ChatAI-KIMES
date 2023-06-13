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

	switch (message?.type) {
		case "request":
			return <RequestChat message={message} />;
		case "response":
			return (
				<ResponseChat>
					{/**
					 * TODO: message.map으로 바꾸기
					 *
					 * 그러러면 ResponseChatChunk에 primitive value를 넘겨줘야함
					 * message 자체를 넘겨주면 불필요한 re-rendering 발생하기 때문에
					 * messageId를 넘겨주고 있음
					 */}
					<ResponseChatChunk messageId={messageId} />
				</ResponseChat>
			);
		default:
			return (
				<ResponseChat>
					<ErrorMessage />
				</ResponseChat>
			);
	}
}

export default memo(ChatChunk);
