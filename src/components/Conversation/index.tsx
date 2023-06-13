import { Stack, styled } from "@mui/material";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { selectMessageIds } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import ChatChunk from "../Chat/ChatChunk";
import { LoadingResponseMessage } from "../Chat/LoadingResponseMessage";
import { ScrollButton } from "./ScrollButton";
import { useScrollToBottom } from "./useScrollToBottom";

export default function Conversation() {
	const { status: isLoading } = useMessageStatus();
	const messageIds = useAppSelector(selectMessageIds);
	const { stackRef } = useScrollToBottom();

	return (
		<>
			<ConversationWrapper
				ref={stackRef}
				style={{ WebkitOverflowScrolling: "touch" }}
			>
				{messageIds.map((message) => (
					<ChatChunk key={message} messageId={message} />
				))}
				{isLoading && <LoadingResponseMessage />}
			</ConversationWrapper>
			<ScrollButton />
		</>
	);
}

const ConversationWrapper = styled(Stack)`
	direction: column;
	flex-grow: 1;
	overflow: scroll;
	position: relative;
	gap: 1rem;
	padding-inline: 1rem;
	padding-top: 4rem;
	padding-bottom: 1.25rem;
`;
