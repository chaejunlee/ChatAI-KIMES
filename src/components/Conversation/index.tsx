import { Stack } from "@mui/material";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { selectMessageIds } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import ChatChunk from "../Chat/ChatChunk";
import { LoadingResponseMessage } from "../Chat/LoadingResponseMessage";
import { ResponseChat } from "../Chat/Response/ResponseChat";
import { useEffect, useRef } from "react";

export default function Conversation() {
	const { status: isLoading } = useMessageStatus();
	const messageIds = useAppSelector(selectMessageIds);

	const stackRef = useRef<HTMLDivElement>(null);

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

	return (
		<Stack
			ref={stackRef}
			direction={"column"}
			flexGrow={"1"}
			overflow={"scroll"}
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
	);
}
