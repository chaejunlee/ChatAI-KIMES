import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { useRef } from "react";
import {
	ButtonResponseType,
	imageResponseCardContentType,
} from "../../Interface/Message/ResponseMessageType";
import { primaryColor } from "../../utils/color";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchResponse } from "../../store/message/fetchResponse";
import useMessageStatus from "../../hooks/Request/useMessageStatus";

interface MessageButtonsProps {
	message: imageResponseCardContentType;
	messageID: string;
}

interface IsSelectedInterface {
	disabled: boolean;
}

const Style =
	(trueProp: string, falseProp: string) => (props: IsSelectedInterface) => {
		return props.disabled ? trueProp : falseProp;
	};

export const StyledButton = styled(Button)<IsSelectedInterface>`
	padding-inline: 0.75rem;

	background: ${Style("#eaefef", "white")};
	color: ${Style(primaryColor, "black")};
	text-align: start;

	border-radius: 20px;
	border: 1px solid ${Style(primaryColor, "#bed1d1")};
	margin: 0 !important;
`;

export function MessageButtons({ message, messageID }: MessageButtonsProps) {
	const clickedBtnListRef = useRef([] as string[]);
	const dispatch = useAppDispatch();
	const { status: isLoading } = useMessageStatus();
	const sendRequest = (value: string) => {
		dispatch(fetchResponse(value));
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
			gap={"4px"}
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
