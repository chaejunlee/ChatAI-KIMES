import { Avatar, Box, Grid, Skeleton, styled } from "@mui/material";
import { forwardRef, useEffect, useRef } from "react";
import sampleMessages from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import Logo from "../../assets/logo.png";
import MessageBuilder from "./MessageBuilder";

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
	paddingBottom: "1rem",
});

const LoadingResponseMessage = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<Grid ref={ref} container justifyContent="flex-start">
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
});

export default function CommunicationDisplay({
	messages,
	loading,
	onButtonClick,
}: CommunicationDisplayProps) {
	const classes = useStyles();
	const boxRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (boxRef.current) {
			boxRef.current.style.scrollMarginBottom = "10rem";
			boxRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [loading]);

	return (
		<Grid item id={"123123"}>
			<StyledBox>
				<Grid container rowSpacing={1}>
					{messages.map((message, idx) => (
						<MessageBuilder
							key={message.type + idx}
							message={message}
							onButtonClick={onButtonClick}
							messageIndex={idx}
						/>
					))}
					{loading ? <LoadingResponseMessage ref={boxRef} /> : null}
				</Grid>
			</StyledBox>
		</Grid>
	);
}

CommunicationDisplay.defaultProps = {
	messages: sampleMessages,
};
