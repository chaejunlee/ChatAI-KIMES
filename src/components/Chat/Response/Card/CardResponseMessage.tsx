import { memo, useRef } from "react";
import {
	ButtonResponseType,
	ImageResponseCardType,
} from "../../../../Interface/Message/ResponseMessageType";
import { BasicResponseMessage } from "../BasicResponseMessage";
import MessageButtons from "./MessageButtons";
import { MessageImage } from "./MessageImage";
import { EntityId } from "@reduxjs/toolkit";
import StyledButton from "./StyledButton";
import { selectById } from "../../../../store/message/buttonsSlice";
import store, { useAppDispatch } from "../../../../store/store";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import { selectMessageById } from "../../../../store/message/messageSlice";
import useMessageStatus from "../../../../hooks/Request/useMessageStatus";
import { Stack } from "@mui/material";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicResponseMessage>{subtitle}</BasicResponseMessage>;
}

function CardResponseMessage({ data }: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;

	const clickedBtnListRef = useRef([] as string[]);
	const dispatch = useAppDispatch();
	const { status: isLoading } = useMessageStatus();
	const buttons = message.buttons || [];

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

	const Button = memo(({ button }: { button: EntityId }) => {
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
	});

	return (
		<div className="message">
			{message.imageUrl && <MessageImage message={message} />}
			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
			{message.buttons && (
				<Stack
					spacing={0.5}
					direction={"row"}
					flexWrap={"wrap"}
					columnGap={"0.5rem"}
					rowGap={"0.5rem"}
					justifyContent={"flex-start"}
					alignItems={"flex-start"}
				>
					{message.buttons.map((button) => (
						<Button key={button.toString()} button={button as EntityId} />
					))}
				</Stack>
			)}
		</div>
	);
}

export default memo(CardResponseMessage);
