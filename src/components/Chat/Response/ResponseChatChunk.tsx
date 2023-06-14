import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../../Interface/Message/ResponseMessageType";
import { selectMessageById } from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";
import { ErrorMessage } from "../ErrorMessage";
import CardResponseMessage from "./Card/CardResponseMessage";
import ContentResponseMessage from "./ContentResponseMessage";

export function ResponseChatChunk({ messageId }: { messageId: EntityId }) {
	const message = useAppSelector((state) =>
		selectMessageById(state, messageId)
	);
	if (!message) return <ErrorMessage />;

	const receivedResponse = message.type === "response" ? message.content : [];

	return (
		<>
			{receivedResponse.map(
				(content: BasicResponseMessageType, idx: number) => {
					switch (content.contentType) {
						case "PlainText":
							return (
								<ContentResponseMessage
									key={content.contentType + idx}
									message={content as ContentResponseMessageType}
								/>
							);
						case "ImageResponseCard":
							return (
								<CardResponseMessage
									key={messageId.toString() + content.contentType + idx}
									data={content as ImageResponseCardType}
								/>
							);
					}
				}
			)}
		</>
	);
}

export default memo(ResponseChatChunk);
