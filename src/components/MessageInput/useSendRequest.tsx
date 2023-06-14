import { useRef } from "react";
import { fetchResponse } from "../../store/message/fetchResponse";
import { isMessageStatusLoading } from "../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const useSendRequest = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(isMessageStatusLoading);

	const inputRef = useRef<HTMLInputElement>(null);
	// for mobile keyboard popup
	const hiddenInputRef = useRef<HTMLInputElement>(null);

	const sendRequest = async () => {
		if (!inputRef.current) return;
		const text = inputRef.current.value;
		if (!canSend(isLoading, text)) return;

		hiddenInputRef.current?.focus({ preventScroll: true });

		await dispatch(
			fetchResponse({ message: text, leaveMessage: true })
		).unwrap();

		inputRef.current.focus({ preventScroll: true });
	};

	return { inputRef, hiddenInputRef, sendRequest };
};

const canSend = (isLoading: boolean, text: string) => {
	if (isLoading) return false;

	if (text.length === 0) return false;

	return true;
};
