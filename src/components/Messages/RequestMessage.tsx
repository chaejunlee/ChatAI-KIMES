import { Typography } from "@mui/material";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import MessageStyle from "./RequestMessageStyle";
interface RequestMessageTypeProps {
	message: RequestMessageType;
}
export default function RequestMessage({ message }: RequestMessageTypeProps) {
	return (
		<MessageStyle>
			<Typography sx={{ textAlign: "left" }}>{message.message}</Typography>
		</MessageStyle>
	);
}
