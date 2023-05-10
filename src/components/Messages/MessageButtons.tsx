import { useContext, useRef } from "react";
import { imageResponseCardContentType } from "../../Interface/Message/ResponseMessageType";
import { Button, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { primaryColor } from "../../utils/color";
import { CardContext } from "../../page/ChatPage";

interface MessageButtonsProps {
	message: imageResponseCardContentType;
	messageIndex: number;
	contentIndex: number;
}

interface IsSelectedInterface {
	isSelected: boolean;
}

const Style =
	(trueProp: string, falseProp: string) => (props: IsSelectedInterface) => {
		return props.isSelected ? trueProp : falseProp;
	};

export const StyledButton = styled(Button)<IsSelectedInterface>`
	margin: 0 auto;
	padding-inline: 0.75rem;

	background: ${Style("#eaefef", "white")};
	color: ${Style(primaryColor, "black")};
	text-align: start;

	border-radius: 20px;
	border: 1px solid ${Style(primaryColor, "#bed1d1")};
`;

export function MessageButtons({
	message,
	messageIndex,
	contentIndex,
}: MessageButtonsProps) {
	const clickedBtnListRef = useRef([] as string[]);
	const { onCardButtonClick } = useContext(CardContext)!;

	const handleButtonClick = (button: any, buttonIndentifier: string) => {
		clickedBtnListRef.current.push(buttonIndentifier);
		onCardButtonClick(button.value);
	};

	return (
		<Grid container spacing={0.5} direction="row">
			{message.buttons.map((button, idx) => {
				const buttonIndentifier = `${messageIndex}-${contentIndex}-${idx}`;
				const isSelected =
					clickedBtnListRef.current.includes(buttonIndentifier);

				return (
					<Grid item xs="auto" key={button.text} maxWidth={"100%"}>
						<StyledButton
							isSelected={isSelected}
							disabled={isSelected}
							id={buttonIndentifier}
							onClick={() => handleButtonClick(button, buttonIndentifier)}
						>
							{button.text}
						</StyledButton>
					</Grid>
				);
			})}
		</Grid>
	);
}
