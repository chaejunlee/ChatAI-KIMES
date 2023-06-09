import { ArrowUpwardOutlined } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { selectKeyboardHeight } from "../../store/keyboard/keyboardSlice";
import { selectMessageIds } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import ChatChunk from "../Chat/ChatChunk";
import { LoadingResponseMessage } from "../Chat/LoadingResponseMessage";
import { ResponseChat } from "../Chat/Response/ResponseChat";

export default function Conversation() {
	const { status: isLoading } = useMessageStatus();
	const messageIds = useAppSelector(selectMessageIds);
	const keyboardHeight = useAppSelector(selectKeyboardHeight);

	const stackRef = useRef<HTMLDivElement>(null);

	const [showScrollToTop, setShowScrollToTop] = useState(false);

	const scrollToTop = () => {
		if (stackRef.current) {
			stackRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		requestAnimationFrame(() => {
			if (stackRef.current) {
				stackRef.current.scrollTo({
					top: stackRef.current.scrollHeight,
					behavior: "smooth",
				});
			}
		});
	}, [isLoading]);

	useEffect(() => {
		if (stackRef.current) {
			let prevValue = stackRef.current?.scrollTop;

			stackRef.current.addEventListener("scroll", () => {
				if (stackRef.current) {
					let currValue = stackRef.current.scrollTop;
					if (Math.abs(prevValue - currValue) < 50) return;
					prevValue = currValue;

					if (stackRef.current.scrollTop > 100) {
						setShowScrollToTop(true);
					} else {
						setShowScrollToTop(false);
					}
				}
			});
		}
		return () => {
			if (stackRef.current) {
				stackRef.current.removeEventListener("scroll", () => {});
			}
		};
	}, []);

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
			<IconButton
				style={{
					opacity: showScrollToTop ? 1 : 0,
					visibility: showScrollToTop ? "visible" : "hidden",
					position: "absolute",
					left: "auto",
					right: "1rem",
					bottom: `calc(5rem + ${keyboardHeight}px)`,
					width: "3rem",
					height: "3rem",
					background: "#fafafa",
					filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
					borderRadius: "50%",
					zIndex: 100,
					transition: "opacity 0.5s ease-in-out",
				}}
				onClick={scrollToTop}
			>
				<ArrowUpwardOutlined />
			</IconButton>
		</>
	);
}
