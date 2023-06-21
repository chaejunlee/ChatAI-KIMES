import { EntityId } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { selectFocusedMessageId } from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";

export function useFocusedMessage(messageId: EntityId) {
	const isFocusedMessage = useAppSelector(selectFocusedMessageId(messageId));
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isFocusedMessage && messageRef.current) {
			messageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	}, [isFocusedMessage]);

	return { isFocusedMessage, messageRef };
}
