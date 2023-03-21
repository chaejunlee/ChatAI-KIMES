import { styled } from "@mui/system";
import React from "react";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";

interface ContentResponseMessageTypeProps {
	message: ContentResponseMessageType;
}

const BasicMessage = styled("div")`
	padding: 8px 8px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;

	background: #32b6ae;
	border-radius: 0px 150px 150px 80px;

	color: white;
`;

export default function ContentResponseMessage({
	message,
}: ContentResponseMessageTypeProps) {
	return <BasicMessage>{message.content}</BasicMessage>;
}
