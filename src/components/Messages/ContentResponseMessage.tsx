import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import { styled, Typography } from "@mui/material";

interface ContentResponseMessageTypeProps {
	message: ContentResponseMessageType;
}

const BasicMessage = styled("div")`
	z-index: -1;
	padding: 8px 16px;
	margin-bottom: 5px;
	display: inline-block;

	max-width: 80%;

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
