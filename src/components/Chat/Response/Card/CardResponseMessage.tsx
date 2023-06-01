import { Stack } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { memo, useRef } from "react";
import {
	ButtonResponseType,
	ImageResponseCardType,
} from "../../../../Interface/Message/ResponseMessageType";
import useMessageStatus from "../../../../hooks/Request/useMessageStatus";
import { selectById } from "../../../../store/message/buttonsSlice";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import store, { useAppDispatch } from "../../../../store/store";
import { BasicResponseMessage } from "../BasicResponseMessage";
import { MessageImage } from "./MessageImage";
import StyledButton from "./StyledButton";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicResponseMessage>{subtitle}</BasicResponseMessage>;
}

function CardResponseMessage({ data }: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;
	const clickedBtnListRef = useRef([] as string[]);
	const buttons = message.buttons || [];

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
						<Button
							clickedBtnListRef={clickedBtnListRef}
							key={button.toString()}
							button={button as EntityId}
						/>
					))}
				</Stack>
			)}
		</div>
	);
}

const Button = memo(
	({
		button,
		clickedBtnListRef,
	}: {
		button: EntityId;
		clickedBtnListRef: React.MutableRefObject<string[]>;
	}) => {
		const dispatch = useAppDispatch();
		const { status: isLoading } = useMessageStatus();

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
	}
);

export default memo(CardResponseMessage);
