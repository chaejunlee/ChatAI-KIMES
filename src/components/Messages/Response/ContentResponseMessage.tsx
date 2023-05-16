import { styled, Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../../utils/chat";
import { primaryColor } from "../../../utils/color";
import { BasicMessage } from "../BasicMessage";

interface ContentResponseMessageTypeProps {
	message: ContentResponseMessageType;
}

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
