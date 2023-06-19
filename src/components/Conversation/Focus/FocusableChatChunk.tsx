import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ChatChunk } from "../../Chat/ChatChunk";
import { useFocusedMessage } from "./useFocusedMessage";
import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";
import { styled } from "@mui/material";

const StyledDiv = styled("div")<{ focusedStyle: string | null }>`
	& .${ANIMATION_TARGET} {
		outline: 0.2rem solid ${(props) => props.focusedStyle || "transparent"};
		transition: outline-color 0.3s ease-in-out;
	}
`;

export function FocusableChatChunk({ messageId }: { messageId: EntityId }) {
	const { messageRef, isFocusedMessage } = useFocusedMessage(messageId);
	const borderWidth = isFocusedMessage ? "hsl(135 70% 50% / 0.3)" : null;

	return (
		<StyledDiv ref={messageRef} focusedStyle={borderWidth}>
			<ChatChunk messageId={messageId} />
		</StyledDiv>
	);
}

export default memo(FocusableChatChunk);
