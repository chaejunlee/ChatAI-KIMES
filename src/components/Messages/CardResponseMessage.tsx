import { ImageResponseCardType } from "../../Interface/Message/ResponseMessageType";
import { Button, Stack, Typography } from "@mui/material";
import styled from "@mui/system/styled";
import { primaryColor } from "../../utils/color";
import { MessageButtons } from "./MessageButtons";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	onButtonClick: (text: string) => void;
	messageIndex: number;
	contentIndex: number;
}

interface IsClickedInterface {
	isClicked: boolean;
}

const Style =
	(trueProp: string, falseProp: string) => (props: IsClickedInterface) => {
		return props.isClicked ? trueProp : falseProp;
	};

export const StyledButton = styled(Button)<IsClickedInterface>`
	margin: 0 auto;
	padding-inline: 0.75rem;

	background: ${Style("#eaefef", "white")};
	color: ${Style(primaryColor, "black")};
	text-align: start;

	border-radius: 20px;
	border: 1px solid ${Style(primaryColor, "#bed1d1")};
`;

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

export default function CardResponseMessage({
	data,
	onButtonClick,
	messageIndex,
	contentIndex,
}: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;

	return (
		<Stack
			marginBottom={1}
			direction="column"
			spacing={2}
			alignItems="flex-start"
		>
			<MessageButtons
				message={message}
				messageIndex={messageIndex}
				contentIndex={contentIndex}
				onButtonClick={onButtonClick}
			/>

			{message.imageUrl ? (
				<BasicMessage>
					<StyledImg src={message.imageUrl} alt={message.title} />
					{message.title ? (
						<Typography marginTop={"0.5rem"}>{message.title}</Typography>
					) : null}
				</BasicMessage>
			) : null}

			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
		</Stack>
	);
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <p>{subtitle}</p>;
}
