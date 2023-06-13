import { RefObject, useRef } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { fetchResponse } from "../../store/message/fetchResponse";
import { useAppDispatch } from "../../store/store";

export const useSendRequest = () => {
	const dispatch = useAppDispatch();
	const { status: isLoading } = useMessageStatus();

	const inputRef = useRef<HTMLInputElement>(null);
	// for mobile keyboard popup
	const hiddenInputRef = useRef<HTMLInputElement>(null);
	const message = inputRef.current?.value;

	const sendRequest = async () => {
		if (!canSend(isLoading, inputRef)) return;
		if (!inputRef.current) return;

		hiddenInputRef.current?.focus({ preventScroll: true });

		await dispatch(
			fetchResponse({ message: inputRef.current.value, leaveMessage: true })
		).unwrap();

		inputRef.current.focus({ preventScroll: true });
	};

	return { inputRef, hiddenInputRef, sendRequest };
};
const canSend = (isLoading: boolean, inputRef: RefObject<HTMLInputElement>) => {
	if (isLoading) return false;
	if (!inputRef || !inputRef.current) return false;

	const text = inputRef.current.value;
	if (text.length === 0) return false;

	return true;
};
