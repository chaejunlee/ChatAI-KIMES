import { styled, Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../../utils/chat";
import { primaryColor } from "../../../utils/color";
import { BasicResponseMessage } from "./BasicResponseMessage";

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
}: {
	message: ContentResponseMessageType;
}) {
	const content = containsUrl(message.content) ? (
		<StyledLink href={message.content} target="_blank" rel="noreferrer">
			관련 링크로 바로가기
		</StyledLink>
	) : (
		message.content
	);

	return (
		<BasicResponseMessage>
			<Typography sx={{ textAlign: "left" }}>{content}</Typography>
		</BasicResponseMessage>
	);
}
