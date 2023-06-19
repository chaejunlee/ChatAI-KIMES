import { primaryColor } from "../../../utils/color";
import StyledButton from "./Card/StyledButton";
import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";
import styled from "@emotion/styled";

export function ResponseLink({ messageContent }: { messageContent: string }) {
	return (
		<StyledButton
			disabled={false}
			className={ANIMATION_TARGET}
			style={{
				border: "none",
				filter: "drop-shadow(rgba(150, 200, 150, 0.8) 0px 3px 3px)",
				borderRadius: "1.25rem",
				marginBottom: "8px",
			}}
		>
			<StyledLink href={messageContent} target="_blank">
				<span>관련 링크로 바로가기</span>
				<LinkSVG />
			</StyledLink>
		</StyledButton>
	);
}

export const StyledLink = styled("a")`
	color: #6a6a6a;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	width: fit-content;
	border-radius: 1.25rem;

	color: ${primaryColor};

	text-decoration: none;
`;

function LinkSVG() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width="20px"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
			/>
		</svg>
	);
}
