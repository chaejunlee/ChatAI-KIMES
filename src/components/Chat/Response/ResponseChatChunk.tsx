import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../../Interface/Message/ResponseMessageType";
import CardResponseMessage from "./Card/CardResponseMessage";
import ContentResponseMessage from "./ContentResponseMessage";

export function ResponseChatChunk({
	message,
	messageID,
}: {
	message: ResponseMessageType;
	messageID: string;
}) {
	const receivedResponse = message.content;
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
									key={content.contentType + idx}
									data={content as ImageResponseCardType}
									messageID={`${messageID}-${idx}`}
								/>
							);
					}
				}
			)}
		</>
	);
}
