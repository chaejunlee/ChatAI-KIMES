import { Stack, Typography } from "@mui/material";
import styled from "@mui/system/styled";
import {
	ImageResponseCardType,
	imageResponseCardContentType,
} from "../../Interface/Message/ResponseMessageType";
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
		<Stack
			marginBottom={1}
			direction="column"
			spacing={2}
			alignItems="flex-start"
		>
			<MessageButtons message={message} messageID={messageID} />

			{message.imageUrl && <MessageImage message={message} />}

			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
		</Stack>
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

const BasicMessage = styled("div")`
	width: 75%;
	padding: 8px 16px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;

	background: #eaefef;
	border-radius: 0px 20px 20px 20px;

	color: black;
	border: none;
	box-shadow: none;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const StyledImg = styled("img")`
	border-radius: 1rem;
	width: 100%;
`;

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <p>{subtitle}</p>;
}
