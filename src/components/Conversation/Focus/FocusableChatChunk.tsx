import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ChatChunk } from "../../Chat/ChatChunk";
import { useFocusedMessage } from "./useFocusedMessage";
import { styled } from "@mui/material";

const StyledDiv = styled("div")<{ focusedStyle: string | null }>`
	filter: drop-shadow(
		0 0 0.2rem ${(props) => props.focusedStyle || "transparent"}
	);
	transfrom: translateZ(0);
	backdrop-filter: blur(0rem);
	transition: filter 0.3s ease-in-out;
`;

export function FocusableChatChunk({ messageId }: { messageId: EntityId }) {
	const { messageRef, isFocusedMessage } = useFocusedMessage(messageId);
	const borderWidth = isFocusedMessage ? "hsl(135 80% 60%)" : null;

	return (
		<StyledDiv ref={messageRef} focusedStyle={borderWidth}>
			<ChatChunk messageId={messageId} />
		</StyledDiv>
	);
}

export default memo(FocusableChatChunk);
