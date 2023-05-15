import { styled, Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";

interface ContentResponseMessageTypeProps {
	message: ContentResponseMessageType;
}

export const BasicMessage = styled("div")`
	z-index: -1;
	padding: 8px 16px;
	margin-bottom: 5px;
	display: inline-block;

	max-width: 70%;

	background: #eaefef;
	border-radius: 0px 20px 20px 20px;

	color: black;
	border: none;
	box-shadow: none;
`;

export default function ContentResponseMessage({
	message,
}: ContentResponseMessageTypeProps) {
	return (
		<BasicMessage>
			<Typography sx={{ textAlign: "left" }}>{message.content}</Typography>
		</BasicMessage>
	);
}
