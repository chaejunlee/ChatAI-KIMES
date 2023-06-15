import { Stack, styled } from "@mui/material";
import {
	isMessageStatusLoading,
	selectMessageIds,
} from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import FocusableChatChunk from "../Chat/FocusableChatChunk";
import { LoadingResponseMessage } from "./LoadingResponseMessage";
import { ScrollButton } from "./ScrollButton";
import { useScrollToBottom } from "./useScrollToBottom";
import BeamworksLogo from "../../assets/BeamworksLogo.png";

export default function Conversation() {
	const isLoading = useAppSelector(isMessageStatusLoading);
	const messageIds = useAppSelector(selectMessageIds);
	const { stackRef } = useScrollToBottom();

	return (
		<>
			<Beamworks />
			<ConversationWrapper ref={stackRef}>
				{messageIds.map((message) => (
					<FocusableChatChunk key={message} messageId={message} />
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
	position: relative;
	gap: 1rem;
	padding-inline: 1rem;
	padding-top: 80px;
	padding-bottom: 6rem;
`;

const Beamworks = () => (
	<img
		style={{
			position: "fixed",
			height: "auto",
			marginBottom: "0.3rem",
			inset: "0",
			marginInline: "auto",
			marginBlock: "auto",
			opacity: "0.2",
			width: "clamp(200px, 40%, 25rem)",
		}}
		src={BeamworksLogo}
		alt="Beamworks"
	/>
);
