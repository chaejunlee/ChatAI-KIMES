import { useRef } from "react";
import {
	ButtonResponseType,
	imageResponseCardContentType,
} from "../../Interface/Message/ResponseMessageType";
import { Button, Grid, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { primaryColor } from "../../utils/color";
import useSendRequestContext from "../../hooks/Request/useSendRequestContext";

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
	const { sendRequest } = useSendRequestContext()!;

	const handleButtonClick = (
		button: ButtonResponseType,
		buttonIndentifier: string
	) => {
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
