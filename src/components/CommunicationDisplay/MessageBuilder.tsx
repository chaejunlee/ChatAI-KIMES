import Message from "../../Interface/Message/Message";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import { Grid, Paper, Stack } from "@mui/material";
import RequestMessage from "../Messages/RequestMessage";
import ContentResponseMessage from "../Messages/ContentResponseMessage";
import CardResponseMessage from "../Messages/CardResponseMessage";

function RequestMessageBuilder(message: RequestMessageType) {
	return <RequestMessage message={message} />;
}

function ResponseMessageBuilder(
	message: ResponseMessageType,
	onButtonClick: (text: string) => void
) {
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
							<CardResponseMessage
								data={content as ImageResponseCardType}
								onButtonClick={onButtonClick}
							/>
						);
				}
			})}
		</Stack>
	);
}

export default function MessageBuilder(
	message: Message,
	onButtonClick: (text: string) => void
): JSX.Element {
	const setSubBuilder = (message: Message) => {
		switch (message.type) {
			case "request":
				return (
					<Grid container spacing={1} justifyContent="flex-end">
						{RequestMessageBuilder(message as RequestMessageType)}
					</Grid>
				);
			case "response":
				return (
					<Grid container spacing={1} justifyContent="flex-start">
						{ResponseMessageBuilder(
							message as ResponseMessageType,
							onButtonClick
						)}
					</Grid>
				);
		}
	};
	return (
		<Grid item xs={12}>
			<Stack spacing={1.25} direction="row">
				{setSubBuilder(message)}
			</Stack>
		</Grid>
	);
}
