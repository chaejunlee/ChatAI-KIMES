import { EntityId } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { selectFocusedMessageId } from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";

export function useFocusedMessage(messageId: EntityId) {
	const isFocusedMessage = useAppSelector(selectFocusedMessageId(messageId));
	const messageRef = useRef<HTMLDivElement>(null);
	const isKeyboardUp = useAppSelector(
		(state) => state.keyboard.bottomPadding > 0
	);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (isFocusedMessage && messageRef.current) {
				messageRef.current.style.scrollPaddingBottom = "80vh";
				messageRef.current.scrollIntoView({
					behavior: "smooth",
					block: isKeyboardUp ? "nearest" : "start",
					inline: "nearest",
				});
			}
		});
	}, [isFocusedMessage]);

	return { isFocusedMessage, messageRef };
}
