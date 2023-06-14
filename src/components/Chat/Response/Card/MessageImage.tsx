import { Typography } from "@mui/material";
import styled from "@mui/system/styled";
import { BasicResponseMessage } from "../BasicResponseMessage";
import { imageResponseCardContentType } from "../../../../Interface/Message/ResponseMessageType";
import { ANIMATION_TARGET } from "../../../../utils/Message/AnimationScope";

const StyledImg = styled("img")`
	border-radius: 1rem;
	width: 100%;
	object-fit: cover;
`;

export function MessageImage({
	message,
}: {
	message: imageResponseCardContentType;
}) {
	return (
		<BasicResponseMessage>
			<StyledImg src={message.imageUrl} alt={message.title} />
			{message.title && (
				<Typography marginTop={"0.5rem"}>{message.title}</Typography>
			)}
		</BasicResponseMessage>
	);
}
