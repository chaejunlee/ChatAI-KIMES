import { Stack } from "@mui/material";
import Message from "../../Interface/Message/Message";
import { ChatChunkContent } from "./ChatChunkContent";

const ChatChunk = ({
	message,
	messageIndex,
}: {
	message: Message;
	messageIndex: number;
}) => {
	return (
		<Stack spacing={1.25} direction="row">
			<ChatChunkContent message={message} messageIndex={messageIndex} />
		</Stack>
	);
};

export default ChatChunk;
