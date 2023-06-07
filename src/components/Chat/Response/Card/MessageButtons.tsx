import { memo } from "react";
import StyledButton from "./StyledButton";
import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import useMessageStatus from "../../../../hooks/Request/useMessageStatus";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import {
	ButtonResponseType,
	ContentResponseMessageType,
} from "../../../../Interface/Message/ResponseMessageType";
import { selectById } from "../../../../store/message/buttonsSlice";
import ContentResponseMessage from "../ContentResponseMessage";
import { errorMessage } from "../../../../utils/Message/errorMessageContent";
import { ANIMATION_TARGET } from "../../../../utils/Message/AnimationScope";

const MessageButton = memo(
	({
		button,
		clickedBtnListRef,
	}: {
		button: EntityId;
		clickedBtnListRef: React.MutableRefObject<string[]>;
	}) => {
		const dispatch = useAppDispatch();
		const { status: isLoading } = useMessageStatus();
		// const isLoading = false;

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

		const buttonIndentifier = button.toString();
		const isSelected = clickedBtnListRef.current.includes(buttonIndentifier);
		const buttonContent = useAppSelector((state) =>
			selectById(state.buttons, button)
		);

		if (!buttonContent)
			return (
				<ContentResponseMessage
					key={"message-error"}
					message={errorMessage as unknown as ContentResponseMessageType}
				/>
			);

		return (
			<div style={{ margin: "0" }} className={ANIMATION_TARGET}>
				<StyledButton
					disabled={isSelected}
					id={buttonIndentifier}
					onClick={() => handleButtonClick(buttonContent, buttonIndentifier)}
				>
					{buttonContent.text}
				</StyledButton>
			</div>
		);
	}
);

export default MessageButton;
