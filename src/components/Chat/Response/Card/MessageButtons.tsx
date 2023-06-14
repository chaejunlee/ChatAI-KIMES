import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ButtonResponseType } from "../../../../Interface/Message/ResponseMessageType";
import { selectById } from "../../../../store/message/buttonsSlice";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ANIMATION_TARGET } from "../../../../utils/Message/AnimationScope";
import { ErrorMessage } from "../../ErrorMessage";
import StyledButton from "./StyledButton";
import { isMessageStatusLoading } from "../../../../store/message/messageSlice";

const MessageButton = memo(
	({
		button,
		clickedBtnListRef,
	}: {
		button: EntityId;
		clickedBtnListRef: React.MutableRefObject<string[]>;
	}) => {
		const dispatch = useAppDispatch();
		const isLoading = useAppSelector(isMessageStatusLoading);
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

		if (!buttonContent) return <ErrorMessage />;

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
