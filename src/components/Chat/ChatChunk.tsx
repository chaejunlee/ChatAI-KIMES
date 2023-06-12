import { EntityId } from "@reduxjs/toolkit";
import { memo, useEffect, useRef } from "react";
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
	const isSelectedMessage = useAppSelector((state) => {
		const targetId = state.messages.targetMessageId;
		return targetId === messageId;
	});
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (isSelectedMessage && messageRef.current) {
				messageRef.current.style.scrollMarginTop = "1rem";
				messageRef.current.scrollIntoView({ behavior: "smooth" });
			}
		});
	}, [isSelectedMessage]);

	const selectedStyle = isSelectedMessage
		? {
				filter: "drop-shadow(0 0.1rem 0.3rem rgba(0, 0, 0, 0.15))",
				transition: "filter 0.5s ease-in-out",
		  }
		: { transition: "filter 0.5s ease-in-out" };

	if (!message)
		return (
			<div style={selectedStyle} ref={messageRef}>
				<ContentResponseMessage
					key={"message-error"}
					message={errorMessage as unknown as ContentResponseMessageType}
				/>
			</div>
		);

	switch (message.type) {
		case "request":
			return (
				<div style={selectedStyle} ref={messageRef}>
					<RequestChat message={message} />
				</div>
			);
		case "response":
			return (
				<div style={selectedStyle} ref={messageRef}>
					<ResponseChat>
						<ResponseChatChunk messageId={messageId} />
					</ResponseChat>
				</div>
			);
	}
}

export default memo(ChatChunk);
