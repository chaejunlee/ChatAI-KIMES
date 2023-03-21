import Message from "../../Interface/Message/Message";
import React from "react";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import { Paper, Stack } from "@mui/material";
import RequestMessage from "../Messages/RequestMessage";
import ContentResponseMessage from "../Messages/ContentResponseMessage";
import CardResponseMessage from "../Messages/CardResponseMessage";

function RequestMessageBuilder(message: RequestMessageType) {
	return <RequestMessage message={message} />;
}

function ResponseMessageBuilder(message: ResponseMessageType) {
	return (
		<Stack>
			{message.content.map((content: BasicResponseMessageType) => {
				switch (content.contentType) {
					case "PlainText":
						return (
							<ContentResponseMessage
								message={content as ContentResponseMessageType}
							/>
						);
					case "ImageResponseCard":
						return (
							<CardResponseMessage data={content as ImageResponseCardType} />
						);
				}
			})}
		</Stack>
	);
}

export default function MessageBuilder(message: Message): JSX.Element {
	const setSubBuilder = (message: Message) => {
		switch (message.type) {
			case "request":
				return RequestMessageBuilder(message as RequestMessageType);
			case "response":
				return ResponseMessageBuilder(message as ResponseMessageType);
		}
	};
	return <Paper style={{ margin: 10 }}>{setSubBuilder(message)}</Paper>;
}
