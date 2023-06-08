import { Stack, Typography } from "@mui/material";
import RequestMessageType from "../../../Interface/Message/RequestMessageType";
import AnimationScope from "../../../utils/Message/AnimationScope";
import { useSmoothScrollToBottom } from "../../../utils/chat";
import { BasicRequestMessage } from "./BasicRequestMessage";
import { CHAT_MAX_WIDTH } from "../Response/ResponseChat";

export function RequestChat({ message }: { message: RequestMessageType }) {
	const divRef = useSmoothScrollToBottom();

	return (
		<AnimationScope>
			<Stack
				ref={divRef}
				maxWidth={CHAT_MAX_WIDTH}
				marginLeft={"auto"}
				right={"0"}
			>
				<BasicRequestMessage>
					<Typography sx={{ textAlign: "left" }}>{message.message}</Typography>
				</BasicRequestMessage>
			</Stack>
		</AnimationScope>
	);
}
