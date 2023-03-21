import React from "react";
import { ImageResponseCardType } from "../../Interface/Message/ResponseMessageType";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
}

const ClickedStyledButton = styled(Button)`
	background: #eaefef;
	color: #32b6ae;
	border-radius: 100px;
	border: 1px solid #32b6ae;
`;

const UnClickedStyledButton = styled(Button)`
	background: white;
	color: black;
	border-radius: 100px;
	border: 1px solid #bed1d1;
`;

// TODO: clicked_list를 따로 state로 관리해야할듯!
const clicked_list = ["균질한 배경"];

export default function CardResponseMessage({
	data,
}: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;
	return (
		<div>
			{message.buttons.map((button) => {
				return clicked_list.includes(button.value) ? (
					<ClickedStyledButton disabled key={button.text}>
						{button.text}
					</ClickedStyledButton>
				) : (
					<UnClickedStyledButton key={button.text}>
						{button.text}
					</UnClickedStyledButton>
				);
			})}
			{message.imageUrl ? (
				<img src={message.imageUrl} alt={message.title} />
			) : null}
			{message.title ? <h3>{message.title}</h3> : null}
			{message.subtitle ? <p>{message.subtitle}</p> : null}
		</div>
	);
}
