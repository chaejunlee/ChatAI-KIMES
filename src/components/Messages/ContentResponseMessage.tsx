import { styled } from "@mui/system";
import React from "react";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
	root: {
		border: "none",
		boxShadow: "none",
	},
}));

interface ContentResponseMessageTypeProps {
	message: ContentResponseMessageType;
}

const BasicMessage = styled("div")`
	padding: 8px 8px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;

	background: #eaefef;
	border-radius: 0px 150px 150px 80px;

	color: black;
	border: none;
	box-shadow: none;
`;

export default function ContentResponseMessage({
	message,
}: ContentResponseMessageTypeProps) {
	const classes = useStyles();

	return <BasicMessage>{message.content}</BasicMessage>;
}
