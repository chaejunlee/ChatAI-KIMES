import { useEffect, useRef } from "react";
import Message from "../../Interface/Message/Message";
import sampleMessages from "../../Data/Message";
import { Avatar, Box, Grid, Skeleton, styled } from "@mui/material";
import MessageBuilder from "./MessageBuilder";
import Logo from "../../assets/logo.png";

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
	paddingLeft: "1rem",
	paddingRight: "1rem",
	paddingBottom: "2.5rem",
	height: "100%",
	maxHeight: "80vh",
	overflow: "auto",
});

const LoadingResponseMessage = () => {
	return (
		<Grid container justifyContent="flex-start">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					marginTop: "0.5rem",
				}}
			>
				<Avatar alt={"ChatAI Logo"} src={Logo} />
				<Skeleton
					variant={"text"}
					sx={{ fontSize: "2.5rem" }}
					width={100}
					animation="wave"
				/>
			</Box>
		</Grid>
	);
};

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
					{loading ? <LoadingResponseMessage /> : null}
				</Grid>
			</StyledBox>
		</Grid>
	);
}

CommunicationDisplay.defaultProps = {
	messages: sampleMessages,
};
