import { memo } from "react";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../../Interface/Message/ResponseMessageType";
import { ErrorMessage } from "../ErrorMessage";
import CardResponseMessage from "./Card/CardResponseMessage";
import ContentResponseMessage from "./ContentResponseMessage";

export function ResponseChatChunk({
	message,
}: {
	message: BasicResponseMessageType[];
}) {
	if (!message) return <ErrorMessage />;

	return (
		<>
			{message.map((content: BasicResponseMessageType, idx: number) => {
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
							/>
						);
				}
			})}
		</>
	);
}

export default memo(ResponseChatChunk);
