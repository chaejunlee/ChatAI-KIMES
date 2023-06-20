import { Stack, styled } from "@mui/material";
import {
	isMessageStatusLoading,
	selectMessageIds,
} from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import FocusableChatChunk from "./Focus/FocusableChatChunk";
import { LoadingResponseMessage } from "./LoadingResponseMessage";
import { ScrollButton } from "./Scroll/ScrollButton";
import { useScrollToBottom } from "./Scroll/useScrollToBottom";
import BeamworksLogo from "../../assets/BeamworksLogo.png";

export default function Conversation() {
	const isLoading = useAppSelector(isMessageStatusLoading);
	const messageIds = useAppSelector(selectMessageIds);
	const { stackRef } = useScrollToBottom();

	return (
		<>
			<Beamworks />
			<ConversationWrapper
				ref={stackRef}
				style={{ WebkitOverflowScrolling: "touch" }}
			>
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
	flex-direction: column;
	flex-grow: 1;
	overflow: scroll;
	position: relative;
	gap: 1rem;
	padding-inline: 0.75rem;
	padding-top: 4rem;
	padding-bottom: 1rem;

	scroll-margin-inline: 1rem;
	scroll-padding-inline: 1rem;
`;

const Beamworks = () => (
	<img
		style={{
			position: "absolute",
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
