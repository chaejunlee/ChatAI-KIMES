import { styled, Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../utils/Chat";
import { primaryColor } from "../../utils/color";

interface ContentResponseMessageTypeProps {
	message: ContentResponseMessageType;
}

export const BasicMessage = styled("div")`
	z-index: 0;
	padding: 8px 16px;
	display: inline-block;

	max-width: 70%;

	background: #eaefef;
	border-radius: 0px 20px 20px 20px;

	color: black;
	border: none;
	box-shadow: none;
`;

const StyledLink = styled("a")`
	color: ${primaryColor};
	word-wrap: break-word;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

export default function ContentResponseMessage({
	message,
}: ContentResponseMessageTypeProps) {
	const isUrl = containsUrl(message.content);

	const content = isUrl ? (
		<StyledLink href={message.content} target="_blank" rel="noreferrer">
			{message.content}
		</StyledLink>
	) : (
		message.content
	);

	return (
		<BasicMessage>
			<Typography sx={{ textAlign: "left" }}>{content}</Typography>
		</BasicMessage>
	);
}
