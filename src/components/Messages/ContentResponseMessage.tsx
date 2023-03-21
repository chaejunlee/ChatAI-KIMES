import { styled } from "@mui/system";
import React from "react";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";

import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

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
	padding: 8px 16px;
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

	return (
		<BasicMessage>
			<Typography sx={{ textAlign: "left" }}>{message.content}</Typography>
		</BasicMessage>
	);
}
