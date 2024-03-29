import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import BeamworksLogo from "../../assets/BeamworksLogo.png";
import { pullInputDown } from "../../store/keyboard/keyboardSlice";
import {
	isMessageStatusLoading,
	selectMessageIds,
} from "../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import FocusableChatChunk from "./Focus/FocusableChatChunk";
import { LoadingResponseMessage } from "./LoadingResponseMessage";
import { ScrollButton } from "./Scroll/ScrollButton";
import { useScrollToBottom } from "./Scroll/useScrollToBottom";

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
	padding-inline: clamp(10px, 2rem, 16px);
	padding-top: 4rem;
	padding-bottom: 1rem;
	scroll-margin-block: clamp(20px, 2rem, 30px);
	scroll-padding-block: clamp(20px, 2rem, 30px);
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
