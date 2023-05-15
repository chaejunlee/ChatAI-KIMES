import { Typography } from "@mui/material";
import styled from "@mui/system/styled";
import {
	ImageResponseCardType,
	imageResponseCardContentType,
} from "../../Interface/Message/ResponseMessageType";
import { BasicMessage } from "./ContentResponseMessage";
import { MessageButtons } from "./MessageButtons";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	messageID: string;
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

function MessageImage({ message }: { message: imageResponseCardContentType }) {
	return (
		<BasicMessage>
			<StyledImg src={message.imageUrl} alt={message.title} />
			{message.title && (
				<Typography marginTop={"0.5rem"}>{message.title}</Typography>
			)}
		</BasicMessage>
	);
}

const StyledImg = styled("img")`
	border-radius: 1rem;
	width: 100%;
	object-fit: cover;
`;

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicMessage>{subtitle}</BasicMessage>;
}
