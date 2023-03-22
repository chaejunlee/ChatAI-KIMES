import React from "react";
import ReactDOM from "react-dom";

import { ImageResponseCardType } from "../../Interface/Message/ResponseMessageType";
import { Button, Grid, Stack, Typography } from "@mui/material";
import styled from "@mui/system/styled";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	onButtonClick: (text: string) => void;
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

// TODO: clicked_list를 따로 state로 관리해야할듯!
const clicked_list = ["균질한 배경", "타원형"];

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
}: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;
	console.log("message", message);
	return (
		<Stack direction="column" spacing={2} alignItems="flex-start">
			<Grid container spacing={0.5} direction="column">
				{message.buttons.map((button) => {
					return clicked_list.includes(button.value) ? (
						<Grid item xs={12} md={6} key={button.text}>
							<ClickedStyledButton
								disabled
								key={button.text}
								onClick={() => onButtonClick(button.value)}
							>
								{button.text}
							</ClickedStyledButton>
						</Grid>
					) : (
						<Grid item xs={12} md={6} key={button.text}>
							<UnClickedStyledButton
								key={button.text}
								onClick={() => onButtonClick(button.value)}
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
