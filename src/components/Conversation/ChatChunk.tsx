import { Stack } from "@mui/material";
import Message from "../../Interface/Message/Message";
import { ChatChunkContent } from "./ChatChunkContent";

const ChatChunk = ({
	message,
	onButtonClick,
	messageIndex,
}: {
	message: Message;
	onButtonClick: (text: string) => void;
	messageIndex: number;
}) => {
	return (
		<Stack spacing={1.25} direction="row">
			<ChatChunkContent
				message={message}
				onButtonClick={onButtonClick}
				messageIndex={messageIndex}
			/>
		</Stack>
	);
};

export default ChatChunk;
