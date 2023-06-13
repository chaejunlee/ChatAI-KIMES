import { EntityId } from "@reduxjs/toolkit";
import { useFocusedMessage } from "./useFocusedMessage";
import { ChatChunk } from "./ChatChunk";

export function FocusableChatChunk({ messageId }: { messageId: EntityId }) {
	const { focusedStyle, messageRef } = useFocusedMessage(messageId);

	return (
		<div ref={messageRef} style={focusedStyle}>
			<ChatChunk messageId={messageId} />
		</div>
	);
}
