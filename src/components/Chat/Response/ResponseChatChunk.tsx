import { EntityId } from "@reduxjs/toolkit";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../../Interface/Message/ResponseMessageType";
import { selectMessageById } from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";
import CardResponseMessage from "./Card/CardResponseMessage";
import ContentResponseMessage from "./ContentResponseMessage";
import { ErrorMessage } from "../ErrorMessage";

export function ResponseChatChunk({ messageId }: { messageId: EntityId }) {
	const message = useAppSelector((state) =>
		selectMessageById(state, messageId)
	);
	if (!message) return <ErrorMessage />;

	// TODO: messageId로 prop 받아서 map 부분 지우기
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
