import { styled, Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../../utils/chat";
import { primaryColor } from "../../../utils/color";
import { BasicResponseMessage } from "./BasicResponseMessage";
import StyledButton from "./Card/StyledButton";
import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";

const StyledLink = styled("a")`
	color: #6a6a6a;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	width: fit-content;

	text-decoration: none;
`;

export default function ContentResponseMessage({
	message,
}: {
	message: ContentResponseMessageType;
}) {
	if (containsUrl(message.content))
		return <ResponseLink messageContent={message.content} />;

	return (
		<BasicResponseMessage>
			{message.content.split(/\\n|\n/g).map((paragraph, idx) => (
				<Typography key={paragraph + idx} sx={{ textAlign: "left" }}>
					{paragraph}
				</Typography>
			))}
		</BasicResponseMessage>
	);
}

function ResponseLink({ messageContent }: { messageContent: string }) {
	return (
		<div className={ANIMATION_TARGET} style={{ marginBottom: "8px" }}>
			<StyledButton
				disabled={false}
				style={{
					border: "none",
					filter: "drop-shadow(rgba(150, 200, 150, 0.8) 0px 3px 3px)",
				}}
			>
				<StyledLink
					style={{ color: `${primaryColor}` }}
					href={messageContent}
					target="_blank"
				>
					<span>관련 링크로 바로가기</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						width="1.25rem"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
						/>
					</svg>
				</StyledLink>
			</StyledButton>
		</div>
	);
}
