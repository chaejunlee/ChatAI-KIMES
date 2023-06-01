import { Stack } from "@mui/material";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { selectMessageIds } from "../../store/message/messageSlice";
import store from "../../store/store";
import ChatChunk from "../Chat/ChatChunk";
import { LoadingResponseMessage } from "../Chat/LoadingResponseMessage";
import { ResponseChat } from "../Chat/Response/ResponseChat";

export default function Conversation() {
	const { status: isLoading } = useMessageStatus();
	const messages = selectMessageIds(store.getState());

	return (
		<Stack
			direction={"column"}
			flexGrow={"1"}
			overflow={"scroll"}
			style={{ WebkitOverflowScrolling: "touch" }}
			gap={"1rem"}
			paddingX={"0.725rem"}
			paddingTop={"4rem"}
			paddingBottom={"1rem"}
		>
			{messages.map((message, idx) => (
				<ChatChunk key={message} messageId={message} />
			))}
			{isLoading && (
				<ResponseChat>
					<LoadingResponseMessage />
				</ResponseChat>
			)}
		</Stack>
	);
}
