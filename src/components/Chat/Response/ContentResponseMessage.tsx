import { styled, Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../../utils/chat";
import { primaryColor } from "../../../utils/color";
import { BasicResponseMessage } from "./BasicResponseMessage";

const StyledLink = styled("a")`
	padding-inline: 0.8rem;
	padding-block: 0.55rem;

	background: white;
	color: black;
	text-align: start;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	width: fit-content;

	border-radius: 20px;
	border: 1px solid ${primaryColor};
	text-decoration: none;
	font-size: 14px;

	transition: all 0.2s ease-in-out;

	&:hover {
		background: ${primaryColor};
		color: white;
	}

	&:active {
		background: ${primaryColor};
		color: white;
	}
`;

export default function ContentResponseMessage({
	message,
}: {
	message: ContentResponseMessageType;
}) {
	if (containsUrl(message.content))
		return (
			<div className="message">
				<StyledLink href={message.content} target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						width="18px"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
						/>
					</svg>
					<span>관련 링크로 바로가기</span>
				</StyledLink>
			</div>
		);

	return (
		<BasicResponseMessage>
			<Typography sx={{ textAlign: "left" }}>{message.content}</Typography>
		</BasicResponseMessage>
	);
}
