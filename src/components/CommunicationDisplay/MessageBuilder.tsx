import { Avatar, Box, Grid, Stack } from "@mui/material";
import { MutableRefObject, Ref, forwardRef, useEffect, useRef } from "react";
import Message from "../../Interface/Message/Message";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import Logo from "../../assets/logo.png";
import CardResponseMessage from "../Messages/CardResponseMessage";
import ContentResponseMessage from "../Messages/ContentResponseMessage";
import RequestMessage from "../Messages/RequestMessage";
import { smoothScrollToBottom } from "../../utils/chat";

function RequestMessageBuilder(message: RequestMessageType) {
	return <RequestMessage message={message} />;
}

function ResponseMessageBuilder(
	message: ResponseMessageType,
	onButtonClick: (text: string) => void,
	messageIndex: number
) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				marginTop: "0.5rem",
			}}
			width={"100%"}
		>
			<Avatar
				imgProps={{ style: { objectFit: "contain" } }}
				alt={"ChatAI"}
				src={Logo}
			/>
			{!message.content ? (
				<>
					<ContentResponseMessage
						message={{
							contentType: "PlainText",
							content:
								"질문을 제대로 알아듣지 못했어요. 준비된 답변을 보시겠어요? ",
						}}
					/>
					<CardResponseMessage
						data={{
							contentType: "ImageResponseCard",
							imageResponseCard: {
								buttons: [
									{
										text: "메뉴 보기",
										value: "메인 메뉴",
									},
								],
							},
						}}
						onButtonClick={onButtonClick}
						messageIndex={messageIndex}
						contentIndex={-1}
					/>
				</>
			) : (
				message.content.map(
					(content: BasicResponseMessageType, idx: number) => {
						switch (content.contentType) {
							case "PlainText":
								return (
									<ContentResponseMessage
										key={content.contentType + idx}
										message={content as ContentResponseMessageType}
									/>
								);
							case "ImageResponseCard":
								return (
									<CardResponseMessage
										key={content.contentType + idx}
										data={content as ImageResponseCardType}
										onButtonClick={onButtonClick}
										messageIndex={messageIndex}
										contentIndex={idx}
									/>
								);
						}
					}
				)
			)}
		</Box>
	);
}

const MessageBuilder = ({
	message,
	onButtonClick,
	messageIndex,
}: {
	message: Message;
	onButtonClick: (text: string) => void;
	messageIndex: number;
}) => {
	return (
		<Stack spacing={1.25} direction="row">
			<SetSubBuilder
				message={message}
				onButtonClick={onButtonClick}
				messageIndex={messageIndex}
			/>
		</Stack>
	);
};

function SetSubBuilder({
	message,
	onButtonClick,
	messageIndex,
}: {
	message: Message;
	onButtonClick: (text: string) => void;
	messageIndex: number;
}) {
	const boxRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		smoothScrollToBottom(boxRef);
	}, [boxRef]);

	switch (message.type) {
		case "request":
			return (
				<Grid ref={boxRef} container justifyContent="flex-end">
					{RequestMessageBuilder(message as RequestMessageType)}
				</Grid>
			);
		case "response":
			return (
				<Grid ref={boxRef} container justifyContent="flex-start">
					{ResponseMessageBuilder(
						message as ResponseMessageType,
						onButtonClick,
						messageIndex
					)}
				</Grid>
			);
	}
}

export default MessageBuilder;
