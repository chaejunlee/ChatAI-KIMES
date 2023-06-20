import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ChatChunk } from "../../Chat/ChatChunk";
import { useFocusedMessage } from "./useFocusedMessage";
import { styled } from "@mui/material";
import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";

const FocusableDiv = styled("div")<{ focusedStyle: string | null }>`
	& .${ANIMATION_TARGET}::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border: 0.2rem solid ${(props) => props.focusedStyle || "transparent"};
		border-radius: 1.5rem;
		pointer-events: none;
		padding: 0rem;
		transform: translate(-0.2rem, -0.2rem);
		transition: border 0.3s ease-in-out;
	}
	& div.${ANIMATION_TARGET}::after {
		border-top-left-radius: 0;
	}
	& button.${ANIMATION_TARGET}::after {
		border-top-left-radius: 1.5rem;
	}
`;

export function FocusableChatChunk({ messageId }: { messageId: EntityId }) {
	const { messageRef, isFocusedMessage } = useFocusedMessage(messageId);
	const borderWidth = isFocusedMessage ? "hsl(100 10% 70% / 0.6)" : null;

	return (
		<FocusableDiv ref={messageRef} focusedStyle={borderWidth}>
			<ChatChunk messageId={messageId} />
		</FocusableDiv>
	);
}

export default memo(FocusableChatChunk);
