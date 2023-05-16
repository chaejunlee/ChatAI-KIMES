import { Stack } from "@mui/material";
import sampleMessages from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import ChatChunk from "./ChatChunk";
import { ResponseChat } from "./Response/ResponseChat";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { LoadingResponseMessage } from "./LoadingResponseMessage";
import { useAppSelector } from "../../store/store";
interface ConversationProps {
	messages: Message[];
}

export default function Conversation() {
	const { status: isLoading } = useMessageStatus();
	const messages = useAppSelector((state) => state.messages.data);
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
