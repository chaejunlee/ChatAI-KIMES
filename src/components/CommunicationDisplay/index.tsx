import React, { useEffect, useRef } from "react";
import Message from "../../Interface/Message/Message";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import sampleMessages from "../../Data/Message";
import { Box, Grid, Stack, styled } from "@mui/material";
import MessageBuilder from "./MessageBuilder";
import { Container } from "@mui/system";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
	root: {
		border: "none",
		boxShadow: "none",
	},
}));

interface CommunicationDisplayProps {
	messages: Message[];
	loading: boolean;
	onButtonClick: (text: string) => void;
}

const StyledBox = styled("div")({
	position: "absolute",
	margin: "0 auto",
	boxSizing: "border-box",
	width: "100%",
	padding: "10px",
	paddingTop: "4rem",
	height: "80vh",
	maxHeight: "80vh",
	overflow: "auto",
});

export default function CommunicationDisplay({
	messages,
	loading,
	onButtonClick,
}: CommunicationDisplayProps) {
	const classes = useStyles();
	const boxRef = useRef(null);

	useEffect(() => {
		if (boxRef.current) {
			// @ts-ignore
			boxRef.current.scrollTop = boxRef.current.scrollHeight; // 스크롤바를 가장 밑으로 내리기
		}
	}, [loading]);

	return (
		<Grid item>
			<StyledBox ref={boxRef}>
				<Grid container>
					{messages.map((message) => MessageBuilder(message, onButtonClick))}
				</Grid>
			</StyledBox>
		</Grid>
	);
}

CommunicationDisplay.defaultProps = {
	messages: sampleMessages,
};
