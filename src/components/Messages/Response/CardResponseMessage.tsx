import { ImageResponseCardType } from "../../../Interface/Message/ResponseMessageType";
import { BasicMessage } from "../BasicMessage";
import { MessageButtons } from "./MessageButtons";
import { MessageImage } from "./MessageImage";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	messageID: string;
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicMessage>{subtitle}</BasicMessage>;
}

export default function CardResponseMessage({
	data,
	messageID,
}: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;

	return (
		<>
			{message.imageUrl && <MessageImage message={message} />}
			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
			<MessageButtons message={message} messageID={messageID} />
		</>
	);
}
