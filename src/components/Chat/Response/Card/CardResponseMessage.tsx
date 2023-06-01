import { ImageResponseCardType } from "../../../../Interface/Message/ResponseMessageType";
import { BasicResponseMessage } from "../BasicResponseMessage";
import MessageButtons from "./MessageButtons";
import { MessageImage } from "./MessageImage";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	messageID: string;
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicResponseMessage>{subtitle}</BasicResponseMessage>;
}

export default function CardResponseMessage({
	data,
	messageID,
}: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;

	return (
		<div className="message">
			{message.imageUrl && <MessageImage message={message} />}
			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
			<MessageButtons message={message} messageID={messageID} />
		</div>
	);
}
