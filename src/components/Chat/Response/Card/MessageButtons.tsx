import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { selectById } from "../../../../store/message/buttonsSlice";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import { isMessageStatusLoading } from "../../../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ANIMATION_TARGET } from "../../../../utils/Message/AnimationScope";
import { ErrorMessage } from "../../ErrorMessage";
import StyledButton from "./StyledButton";

const MessageButton = memo(
	({
		buttonId,
		addClickedBtn,
		checkBtnClicked,
	}: {
		buttonId: EntityId;
		addClickedBtn: (buttonIndentifier: string) => void;
		checkBtnClicked: (buttonIndentifier: string) => boolean;
	}) => {
		const dispatch = useAppDispatch();
		const isLoading = useAppSelector(isMessageStatusLoading);
		const buttonContent = useAppSelector((state) =>
			selectById(state.buttons, buttonId)
		);

		const buttonIndentifier = buttonId.toString();
		const isClicked = checkBtnClicked(buttonIndentifier);

		if (!buttonContent) return <ErrorMessage />;

		const handleButtonClick = () => {
			if (isLoading) return;
			addClickedBtn(buttonIndentifier);
			dispatch(
				fetchResponse({ message: buttonContent.value, leaveMessage: false })
			);
		};

		return (
			<StyledButton
				className={ANIMATION_TARGET}
				disabled={isClicked}
				id={buttonIndentifier}
				onClick={handleButtonClick}
			>
				{buttonContent.text}
			</StyledButton>
		);
	}
);

export default MessageButton;
