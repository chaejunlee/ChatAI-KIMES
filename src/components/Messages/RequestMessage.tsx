import { Typography } from "@mui/material";
import React from "react";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import MessageStyle from "./RequestMessageStyle";
interface RequestMessageTypeProps {
	message: RequestMessageType;
}
export default function RequestMessage({ message }: RequestMessageTypeProps) {
	return (
		<MessageStyle props={message}>
			<Typography sx={{ textAlign: "left" }}>{message.message}</Typography>
		</MessageStyle>
	);
}
