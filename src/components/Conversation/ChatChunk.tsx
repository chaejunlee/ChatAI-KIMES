import { Stack } from "@mui/material";
import Message from "../../Interface/Message/Message";
import { ChatChunkContent } from "./ChatChunkContent";

const ChatChunk = ({
	message,
	messageID,
}: {
	message: Message;
	messageID: string;
}) => {
	return (
		<Stack spacing={1.25} direction={"row"}>
			<ChatChunkContent message={message} messageID={String(messageID)} />
		</Stack>
	);
};

export default ChatChunk;
