import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ChatChunk } from "../../Chat/ChatChunk";
import { useFocusedMessage } from "./useFocusedMessage";

export function FocusableChatChunk({ messageId }: { messageId: EntityId }) {
	const { focusedStyle, messageRef } = useFocusedMessage(messageId);

	return (
		<div ref={messageRef} style={focusedStyle}>
			<ChatChunk messageId={messageId} />
		</div>
	);
}

export default memo(FocusableChatChunk);
