import { useRef } from "react";
import { imageResponseCardContentType } from "../../Interface/Message/ResponseMessageType";
import { Grid } from "@mui/material";
import { StyledButton } from "./CardResponseMessage";

interface MessageButtonsProps {
	message: imageResponseCardContentType;
	messageIndex: number;
	contentIndex: number;
	onButtonClick: (text: string) => void;
}

export function MessageButtons({
	message,
	messageIndex,
	contentIndex,
	onButtonClick,
}: MessageButtonsProps) {
	const clickedBtnListRef = useRef([] as string[]);

	const handleButtonClick = (button: any, buttonIndentifier: string) => {
		clickedBtnListRef.current.push(buttonIndentifier);
		onButtonClick(button.value);
	};

	return (
		<Grid container spacing={0.5} direction="row">
			{message.buttons.map((button, idx) => {
				const buttonIndentifier = `${messageIndex}-${contentIndex}-${idx}`;
				const isClicked = clickedBtnListRef.current.includes(buttonIndentifier);
				return (
					<Grid item xs="auto" key={button.text} maxWidth={"100%"}>
						<StyledButton
							isClicked={isClicked}
							disabled={isClicked}
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
