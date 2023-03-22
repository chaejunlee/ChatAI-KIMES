import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { ImageResponseCardType } from "../../Interface/Message/ResponseMessageType";
import { Button, Grid, Stack, Typography } from "@mui/material";
import styled from "@mui/system/styled";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	onButtonClick: (text: string) => void;
	messageIndex: number;
	contentIndex: number;
}

const ClickedStyledButton = styled(Button)`
	margin: 0 auto;
	background: #eaefef;
	color: #32b6ae;
	border-radius: 8em;
	border: 1px solid #32b6ae;
`;

const UnClickedStyledButton = styled(Button)`
	margin: 0 auto;
	background: white;
	color: black;
	border-radius: 8em;
	border: 1px solid #bed1d1;
`;

const BasicMessage = styled("div")`
	width: 75%;
	padding: 8px 16px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;

	background: #eaefef;
	border-radius: 0px 1.5em 1.5em 1.5em;

	color: black;
	border: none;
	box-shadow: none;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const StyledImg = styled("img")`
	border-radius: 1rem;
	width: 100%;
	height: 100%;
`;

export default function CardResponseMessage({
	data,
	onButtonClick,
	messageIndex,
	contentIndex,
}: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;

	const clickedBtnListRef = useRef([] as string[]);

	const handleButtonClick = (button: any, buttonIndentifier: string) => {
		clickedBtnListRef.current.push(buttonIndentifier);
		onButtonClick(button.value);
	};

	return (
		<Stack
			marginBottom={1}
			direction="column"
			spacing={2}
			alignItems="flex-start"
		>
			<Grid container spacing={0.5} direction="row">
				{message.buttons.map((button, idx) => {
					const buttonIndentifier = `${messageIndex}-${contentIndex}-${idx}`;
					return clickedBtnListRef.current.includes(buttonIndentifier) ? (
						<Grid item xs="auto" key={button.text}>
							<ClickedStyledButton
								id={buttonIndentifier}
								disabled
								key={button.text}
								onClick={() => handleButtonClick(button, buttonIndentifier)}
							>
								{button.text}
							</ClickedStyledButton>
						</Grid>
					) : (
						<Grid item xs="auto" key={button.text}>
							<UnClickedStyledButton
								id={buttonIndentifier}
								key={button.text}
								onClick={() => handleButtonClick(button, buttonIndentifier)}
							>
								{button.text}
							</UnClickedStyledButton>
						</Grid>
					);
				})}
			</Grid>
			{message.imageUrl ? (
				<BasicMessage>
					<StyledImg src={message.imageUrl} alt={message.title} />
					{message.title ? (
						<Typography marginTop={"0.5rem"}>{message.title}</Typography>
					) : null}
				</BasicMessage>
			) : null}
			{message.subtitle ? <p>{message.subtitle}</p> : null}
		</Stack>
	);
}
