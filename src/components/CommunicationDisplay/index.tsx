import React, { useEffect, useRef } from "react";
import Message from "../../Interface/Message/Message";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import sampleMessages from "../../Data/Message";
import { Box, Grid, Stack } from "@mui/material";
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
}

export default function CommunicationDisplay({
	messages,
	loading,
}: CommunicationDisplayProps) {
	const classes = useStyles();
	const boxRef = useRef(null);

	useEffect(() => {
		console.log("gihgighi");
		if (boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight; // 스크롤바를 가장 밑으로 내리기
		}
	}, [loading]);

	return (
		<Grid item>
			<Box
				ref={boxRef} // ref 추가
				sx={{
					width: 500, // 너비
					padding: "10px",
					height: 500, // 높이
					maxHeight: "80vh", // 최대 높이
					overflow: "auto", // 스크롤 가능하도록
				}}
			>
				<Grid container spacing={2.5}>
					{messages.map((message) => MessageBuilder(message))}
				</Grid>
			</Box>
		</Grid>
	);
}

CommunicationDisplay.defaultProps = {
	messages: sampleMessages,
};
