import { EntityId } from "@reduxjs/toolkit";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../../Interface/Message/ResponseMessageType";
import CardResponseMessage from "./Card/CardResponseMessage";
import ContentResponseMessage from "./ContentResponseMessage";
import store from "../../../store/store";
import { selectMessageById } from "../../../store/message/messageSlice";

export function ResponseChatChunk({ messageId }: { messageId: EntityId }) {
	const message = selectMessageById(store.getState(), messageId)!;
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
