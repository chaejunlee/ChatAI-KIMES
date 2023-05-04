import Message from "../../Interface/Message/Message";
import RequestMessageType from "../../Interface/Message/RequestMessageType";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import RequestMessage from "../Messages/RequestMessage";
import ContentResponseMessage from "../Messages/ContentResponseMessage";
import CardResponseMessage from "../Messages/CardResponseMessage";
import Logo from "../../assets/logo.png";
import { useEffect, useRef } from "react";

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
		>
			<Avatar alt={"ChatAI"} src={Logo} />
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

export default function MessageBuilder({
	message,
	onButtonClick,
	messageIndex,
}: {
	message: Message;
	onButtonClick: (text: string) => void;
	messageIndex: number;
}): JSX.Element {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			divRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [divRef]);

	const setSubBuilder = (message: Message) => {
		switch (message.type) {
			case "request":
				return (
					<Grid ref={divRef} container justifyContent="flex-end">
						{RequestMessageBuilder(message as RequestMessageType)}
					</Grid>
				);
			case "response":
				return (
					<Grid ref={divRef} container justifyContent="flex-start">
						{ResponseMessageBuilder(
							message as ResponseMessageType,
							onButtonClick,
							messageIndex
						)}
					</Grid>
				);
		}
	};
	return (
		<Grid ref={divRef} item xs={12}>
			<Stack spacing={1.25} direction="row">
				{setSubBuilder(message)}
			</Stack>
		</Grid>
	);
}
