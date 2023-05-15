import { Stack } from "@mui/material";
import sampleMessages from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import ChatChunk from "./ChatChunk";
import { ResponseChat } from "./Response/ResponseChat";
import useSendRequestContext from "../../hooks/Request/useSendRequestContext";
import { LoadingResponseMessage } from "./LoadingResponseMessage";
interface ConversationProps {
	messages: Message[];
}

export default function Conversation({
	messages = sampleMessages,
}: ConversationProps) {
	const { loading: isLoading } = useSendRequestContext()!;
	return (
		<Stack
			direction={"column"}
			flexGrow={"1"}
			overflow={"scroll"}
			style={{ WebkitOverflowScrolling: "touch" }}
			gap={"1rem"}
			paddingX={"1rem"}
			paddingTop={"4rem"}
			paddingBottom={"1rem"}
		>
			{messages.map((message, idx) => (
				<ChatChunk
					key={message.type + String(idx)}
					message={message}
					messageID={String(idx)}
				/>
			))}
			{isLoading && (
				<ResponseChat>
					<LoadingResponseMessage />
				</ResponseChat>
			)}
		</Stack>
	);
}
