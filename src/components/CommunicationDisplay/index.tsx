import { Box, Grid, Skeleton, styled } from "@mui/material";
import sampleMessages from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import MessageBuilder from "./MessageBuilder";

interface CommunicationDisplayProps {
	messages: Message[];
	loading: boolean;
	onButtonClick: (text: string) => void;
}

const StyledBox = styled("div")({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	margin: "0 auto",
	boxSizing: "border-box",
	width: "100%",
	paddingTop: "4rem",
	paddingLeft: "1rem",
	paddingRight: "1rem",
	paddingBottom: "1rem",
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
				width={"100%"}
			>
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
	messages = sampleMessages,
	loading,
	onButtonClick,
}: CommunicationDisplayProps) {
	return (
		<StyledBox>
			{messages.map((message, idx) => (
				<MessageBuilder
					key={message.type + idx}
					message={message}
					onButtonClick={onButtonClick}
					messageIndex={idx}
				/>
			))}
			{loading ? <LoadingResponseMessage /> : null}
		</StyledBox>
	);
}
