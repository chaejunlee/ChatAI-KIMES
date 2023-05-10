import { Skeleton, Stack } from "@mui/material";
import sampleMessages from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import ChatChunk from "./ChatChunk";
import { ResponseChat } from "./Response/ResponseChat";

interface ConversationProps {
	messages: Message[];
	loading: boolean;
}

const LoadingResponseMessage = () => {
	return (
		<Stack justifyContent="flex-start">
			<Skeleton
				variant={"text"}
				sx={{ fontSize: "2.5rem", width: "clamp(100px, 30%, 400px)" }}
				animation="wave"
			/>
		</Stack>
	);
};

export default function Conversation({
	messages = sampleMessages,
	loading,
}: ConversationProps) {
	return (
		<Stack
			direction="column"
			flexGrow={"1"}
			overflow={"scroll"}
			style={{ WebkitOverflowScrolling: "touch" }}
			gap={"1rem"}
			paddingX={"1rem"}
			paddingBottom={"1rem"}
			paddingTop={"4rem"}
		>
			{messages.map((message, idx) => (
				<ChatChunk
					key={message.type + idx}
					message={message}
					messageIndex={idx}
				/>
			))}
			{loading && (
				<ResponseChat>
					<LoadingResponseMessage />
				</ResponseChat>
			)}
		</Stack>
	);
}
