import { Stack, Typography } from "@mui/material";
import RequestMessageType from "../../../Interface/Message/RequestMessageType";
import AnimationScope from "../../../utils/Message/useMessageAnimation";
import { useSmoothScrollToBottom } from "../../../utils/chat";
import { BasicRequestMessage } from "./BasicRequestMessage";

export function RequestChat({ message }: { message: RequestMessageType }) {
	const divRef = useSmoothScrollToBottom();

	return (
		<AnimationScope>
			<Stack ref={divRef} maxWidth={"80%"} marginLeft={"auto"} right={"0"}>
				<BasicRequestMessage>
					<Typography sx={{ textAlign: "left" }}>{message.message}</Typography>
				</BasicRequestMessage>
			</Stack>
		</AnimationScope>
	);
}
