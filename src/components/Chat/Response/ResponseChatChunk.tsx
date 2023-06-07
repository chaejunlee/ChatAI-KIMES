import { EntityId } from "@reduxjs/toolkit";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../../Interface/Message/ResponseMessageType";
import { selectMessageById } from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";
import { errorMessage } from "../../../utils/Message/errorMessageContent";
import CardResponseMessage from "./Card/CardResponseMessage";
import ContentResponseMessage from "./ContentResponseMessage";

export function ResponseChatChunk({ messageId }: { messageId: EntityId }) {
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
