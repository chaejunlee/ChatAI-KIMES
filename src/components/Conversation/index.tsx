import {
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { RefObject, useEffect, useRef } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import {
	getNextMessage,
	getPreviousMessage,
	selectMessageIds,
} from "../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import ChatChunk from "../Chat/ChatChunk";
import { LoadingResponseMessage } from "../Chat/LoadingResponseMessage";
import { ResponseChat } from "../Chat/Response/ResponseChat";

export default function Conversation() {
	const { status: isLoading } = useMessageStatus();
	const messageIds = useAppSelector(selectMessageIds);
	const dispatch = useAppDispatch();

	const stackRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = (stackRef: RefObject<HTMLDivElement>) => {
		if (stackRef.current) {
			stackRef.current.scrollTo({
				top: stackRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	};

	const showTopButton = useAppSelector((state) => {
		return state.messages.targetMessageId !== state.messages.ids[0];
	});

	const showBottomButton = useAppSelector((state) => {
		return state.messages.targetMessageId !== "bottom";
	});

	useEffect(() => {
		scrollToBottom(stackRef);
	}, [isLoading]);

	return (
		<>
			<Stack
				ref={stackRef}
				direction={"column"}
				flexGrow={"1"}
				overflow={"scroll"}
				position={"relative"}
				style={{ WebkitOverflowScrolling: "touch" }}
				gap={"1rem"}
				paddingX={"1rem"}
				paddingTop={"4rem"}
				paddingBottom={"1rem"}
			>
				{messageIds.map((message) => (
					<ChatChunk key={message} messageId={message} />
				))}
				{isLoading && (
					<ResponseChat>
						<LoadingResponseMessage />
					</ResponseChat>
				)}
			</Stack>
			<div
				style={{
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					left: "auto",
					right: "1rem",
					bottom: "5rem",
					zIndex: 100,
				}}
			>
				<IconButton
					style={{
						width: "2.5rem",
						height: "2.5rem",
						background: "#fafafa",
						filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
						borderRadius: "50%",

						transition: "opacity 0.5s ease-in-out",
					}}
					onClick={() => {
						dispatch(getPreviousMessage());
					}}
					disabled={!showTopButton}
				>
					<ArrowUpwardOutlined />
				</IconButton>
				<IconButton
					style={{
						width: "2.5rem",
						height: "2.5rem",
						background: "#fafafa",
						filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
						borderRadius: "50%",
						transition: "opacity 0.5s ease-in-out",
					}}
					onClick={() => {
						dispatch(
							getNextMessage({
								callback: () => scrollToBottom(stackRef),
							})
						);
					}}
					disabled={!showBottomButton}
				>
					<ArrowDownwardOutlined />
				</IconButton>
			</div>
		</>
	);
}
