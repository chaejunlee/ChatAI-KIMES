import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ChatChunk } from "../../Chat/ChatChunk";
import { useFocusedMessage } from "./useFocusedMessage";
import { styled } from "@mui/material";
import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";

const setColor = (weight: number) => (props: { focusedStyle: boolean }) =>
	props.focusedStyle ? `hsl(130 ${weight}% 70% / 0.6)` : "transparent";

const FocusableDiv = styled("div")<{ focusedStyle: boolean }>`
	--border-width: 0.1rem;
	--border-width-negative: calc(var(--border-width) * -1);

	& .${ANIMATION_TARGET}::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border: var(--border-width) solid ${setColor(10)};
		border-radius: 1.1rem;
		pointer-events: none;
		padding: 0rem;
		transform: translate(
			var(--border-width-negative),
			var(--border-width-negative)
		);
		transition: border 0.3s ease-in-out;
	}
	& div.response.${ANIMATION_TARGET}::after {
		border-top-left-radius: 0;
	}
	& button.${ANIMATION_TARGET}::after {
		border-radius: 1.25rem;
		border: 0.1rem solid ${setColor(70)};
	}
	& div.request.${ANIMATION_TARGET}::after {
		border-top-right-radius: 0;
	}
`;

export function FocusableChatChunk({ messageId }: { messageId: EntityId }) {
	const { messageRef, isFocusedMessage } = useFocusedMessage(messageId);

	return (
		<FocusableDiv ref={messageRef} focusedStyle={isFocusedMessage}>
			<ChatChunk messageId={messageId} />
		</FocusableDiv>
	);
}

export default memo(FocusableChatChunk);
