import { Stack, Typography } from "@mui/material";
import RequestMessageType from "../../../Interface/Message/RequestMessageType";
import AnimationScope from "../../../utils/Message/AnimationScope";
import { CHAT_MAX_WIDTH } from "../Response/ResponseChat";
import { BasicRequestMessage } from "./BasicRequestMessage";

export function RequestChat({ message }: { message: RequestMessageType }) {
	return (
		<AnimationScope>
			<Stack maxWidth={CHAT_MAX_WIDTH} marginLeft={"auto"} right={"0"}>
				<BasicRequestMessage>
					<Typography sx={{ textAlign: "left" }}>{message.message}</Typography>
				</BasicRequestMessage>
			</Stack>
		</AnimationScope>
	);
}
