import { Stack, Typography } from "@mui/material";
import RequestMessageType from "../../../Interface/Message/RequestMessageType";
import AnimationScope from "../../../utils/Message/useMessageAnimation";
import { useSmoothScrollToBottom } from "../../../utils/chat";
import { BasicRequestMessage } from "./BasicRequestMessage";

export function RequestChat({ message }: { message: RequestMessageType }) {
	const divRef = useSmoothScrollToBottom();

	return (
		<AnimationScope>
			<Stack ref={divRef} width={"100%"} alignItems={"end"}>
				<BasicRequestMessage>
					<Typography sx={{ textAlign: "left" }}>{message.message}</Typography>
				</BasicRequestMessage>
			</Stack>
		</AnimationScope>
	);
}
