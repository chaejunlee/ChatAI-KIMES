import { Stack } from "@mui/material";
import { memo, useRef } from "react";
import { ButtonResponseType } from "../../../../Interface/Message/ResponseMessageType";
import useMessageStatus from "../../../../hooks/Request/useMessageStatus";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import store, { useAppDispatch } from "../../../../store/store";
import StyledButton from "./StyledButton";
import { EntityId } from "@reduxjs/toolkit";
import { selectById } from "../../../../store/message/buttonsSlice";
import { selectMessageById } from "../../../../store/message/messageSlice";

interface MessageButtonsProps {
	messageId: EntityId;
}

export function MessageButtons({ messageId }: MessageButtonsProps) {
	const clickedBtnListRef = useRef([] as string[]);
	const dispatch = useAppDispatch();
	const { status: isLoading } = useMessageStatus();
	const message = selectMessageById(store.getState(), messageId)!;
	const buttons = message.type === "response" ? message.content : [];

	const sendRequest = (value: string) => {
		dispatch(fetchResponse({ message: value, leaveMessage: false }));
	};

	const handleButtonClick = (
		button: ButtonResponseType,
		buttonIndentifier: string
	) => {
		if (isLoading) return;
		clickedBtnListRef.current.push(buttonIndentifier);
		sendRequest(button.value);
	};

	const Button = ({ button }: { button: EntityId }) => {
		const buttonIndentifier = button.toString();
		const isSelected = clickedBtnListRef.current.includes(buttonIndentifier);
		const buttonContent = selectById(store.getState().buttons, button)!;

		return (
			<StyledButton
				disabled={isSelected}
				id={buttonIndentifier}
				onClick={() => handleButtonClick(buttonContent, buttonIndentifier)}
			>
				{buttonContent.text}
			</StyledButton>
		);
	};

	return (
		<Stack
			spacing={0.5}
			direction={"row"}
			flexWrap={"wrap"}
			columnGap={"0.5rem"}
			rowGap={"0.5rem"}
			justifyContent={"flex-start"}
			alignItems={"flex-start"}
		></Stack>
	);
}

export default memo(MessageButtons);
