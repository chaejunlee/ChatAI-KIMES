import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../../Interface/Message/ResponseMessageType";
import CardResponseMessage from "../../Messages/CardResponseMessage";
import ContentResponseMessage from "../../Messages/ContentResponseMessage";
import { DefaultCardResponseMessage } from "./DefaultCardResponseMessage";
import { ResponseChat } from "./ResponseChat";

export function ResponseChatChunk({
	message,
	onButtonClick,
	messageIndex,
}: {
	message: ResponseMessageType;
	onButtonClick: (text: string) => void;
	messageIndex: number;
}) {
	const receivedResponse = message.content;
	return (
		<ResponseChat>
			{receivedResponse ? (
				receivedResponse.map(
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
										onButtonClick={onButtonClick}
										messageIndex={messageIndex}
										contentIndex={idx}
									/>
								);
						}
					}
				)
			) : (
				<DefaultCardResponseMessage
					onButtonClick={onButtonClick}
					messageIndex={messageIndex}
				/>
			)}
		</ResponseChat>
	);
}
