import { EntityId } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { selectFocusedMessageId } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";

export function useFocusedMessage(messageId: EntityId) {
	const isFocusedMessage = useAppSelector(selectFocusedMessageId(messageId));
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (isFocusedMessage && messageRef.current) {
				messageRef.current.style.scrollMarginTop = "1rem";
				messageRef.current.scrollIntoView({ behavior: "smooth" });
			}
		});
	}, [isFocusedMessage]);

	const focusedStyle = isFocusedMessage
		? {
				filter: "drop-shadow(0 0 .5vw rgba(30, 30, 30, 0.2))",
				backdropFilter: "blur(0)",
				transform: "translateZ(0)",
				transition: "filter 0.5s ease-in-out",
		  }
		: { transition: "filter 0.5s ease-in-out" };

	return { focusedStyle, messageRef };
}
