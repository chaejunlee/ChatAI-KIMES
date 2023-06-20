import { EntityId } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { selectFocusedMessageId } from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";

export function useFocusedMessage(messageId: EntityId) {
	const isFocusedMessage = useAppSelector(selectFocusedMessageId(messageId));
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (isFocusedMessage && messageRef.current) {
				messageRef.current.style.scrollMarginBottom = "1rem";
				messageRef.current.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "start",
				});
			}
		});
	}, [isFocusedMessage]);

	return { isFocusedMessage, messageRef };
}