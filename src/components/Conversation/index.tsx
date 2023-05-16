import { Stack } from "@mui/material";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { useAppSelector } from "../../store/store";
import ChatChunk from "../Chat/ChatChunk";
import { LoadingResponseMessage } from "../Chat/LoadingResponseMessage";
import { ResponseChat } from "../Chat/Response/ResponseChat";

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
