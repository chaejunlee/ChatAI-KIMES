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
	position: "relative",
	margin: "0 auto",
	boxSizing: "border-box",
	width: "100%",
	paddingTop: "4rem",
	paddingLeft: "2.5%",
	paddingRight: "2.5%",
	paddingBottom: "2.5rem",
	height: "100%",
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
		<Grid item id={"123123"}>
			<StyledBox ref={boxRef}>
				<Grid container rowSpacing={1}>
					{messages.map((message, idx) =>
						MessageBuilder(message, onButtonClick, idx)
					)}
				</Grid>
			</StyledBox>
		</Grid>
	);
}

CommunicationDisplay.defaultProps = {
	messages: sampleMessages,
};
