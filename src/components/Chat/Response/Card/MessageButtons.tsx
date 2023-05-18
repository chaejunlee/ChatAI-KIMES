import { Stack } from "@mui/material";
import { useRef } from "react";
import {
	ButtonResponseType,
	imageResponseCardContentType,
} from "../../../../Interface/Message/ResponseMessageType";
import useMessageStatus from "../../../../hooks/Request/useMessageStatus";
import { fetchResponse } from "../../../../store/message/fetchResponse";
import { useAppDispatch } from "../../../../store/store";
import { StyledButton } from "./StyledButton";

interface MessageButtonsProps {
	message: imageResponseCardContentType;
	messageID: string;
}

export function MessageButtons({ message, messageID }: MessageButtonsProps) {
	const clickedBtnListRef = useRef([] as string[]);
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

	return (
		<Stack
			spacing={0.5}
			direction={"row"}
			flexWrap={"wrap"}
			gap={"6px"}
			justifyContent={"flex-start"}
			alignItems={"flex-start"}
		>
			{message.buttons.map((button, idx) => {
				const buttonIndentifier = `${messageID}-${idx}`;
				const isSelected =
					clickedBtnListRef.current.includes(buttonIndentifier);

				return (
					<StyledButton
						key={buttonIndentifier}
						disabled={isSelected}
						id={buttonIndentifier}
						onClick={() => handleButtonClick(button, buttonIndentifier)}
					>
						{button.text}
					</StyledButton>
				);
			})}
		</Stack>
	);
}
