import { Stack, styled } from "@mui/material";
import {
	isMessageStatusLoading,
	selectMessageIds,
} from "../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import FocusableChatChunk from "./Focus/FocusableChatChunk";
import { LoadingResponseMessage } from "./LoadingResponseMessage";
import { ScrollButton } from "./Scroll/ScrollButton";
import { useScrollToBottom } from "./Scroll/useScrollToBottom";
import BeamworksLogo from "../../assets/BeamworksLogo.png";
import { pullInputDown } from "../../store/keyboard/keyboardSlice";

export default function Conversation() {
	const isLoading = useAppSelector(isMessageStatusLoading);
	const messageIds = useAppSelector(selectMessageIds);
	const { stackRef } = useScrollToBottom();
	const dispatch = useAppDispatch();
	const isKeyboardOpen = useAppSelector(
		(state) => state.keyboard.bottomPadding > 0
	);

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
			{isKeyboardOpen && (
				<ResetButton onClick={() => dispatch(pullInputDown())}>
					키보드 내리기
				</ResetButton>
			)}
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

	scroll-margin-block: 2rem;
	scroll-padding-block: 2rem;
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

const ResetButton = styled("div")`
	position: absolute;
	display: block;

	bottom: -6rem;
	left: 0;
	right: 0;
	margin-inline: auto;
	text-align: center;

	padding-inline: 1rem;
	padding-block: 0.5rem;
	width: 7rem;
	border-radius: 100vh;

	background: #eee;
	color: #333;
	font-weight: semi-bold;
	z-index: 100;
`;
