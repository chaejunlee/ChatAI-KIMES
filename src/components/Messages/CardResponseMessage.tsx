import { useRef } from "react";

import { ImageResponseCardType } from "../../Interface/Message/ResponseMessageType";
import { Button, Grid, Stack, Typography } from "@mui/material";
import styled from "@mui/system/styled";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
	onButtonClick: (text: string) => void;
	messageIndex: number;
	contentIndex: number;
}

interface IsClickedInterface {
	isClicked: boolean;
}

const Style =
	(trueProp: string, falseProp: string) => (props: IsClickedInterface) => {
		return props.isClicked ? trueProp : falseProp;
	};

const StyledButton = styled(Button)<IsClickedInterface>`
	margin: 0 auto;
	padding-inline: 0.75rem;

	background: ${Style("#eaefef", "white")};
	color: ${Style("#32b6ae", "black")};

	border-radius: 8em;
	border: 1px solid ${Style("#32b6ae", "#bed1d1")};
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
					const isClicked =
						clickedBtnListRef.current.includes(buttonIndentifier);
					return (
						<Grid item xs="auto" key={button.text}>
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
