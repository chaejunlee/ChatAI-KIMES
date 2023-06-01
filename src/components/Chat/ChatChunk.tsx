import { Stack, Typography } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import {
	BasicResponseMessageType,
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../Interface/Message/ResponseMessageType";
import { selectMessageById } from "../../store/message/messageSlice";
import store from "../../store/store";
import AnimationScope from "../../utils/Message/AnimationScope";
import { useSmoothScrollToBottom } from "../../utils/chat";
import { BasicRequestMessage } from "./Request/BasicRequestMessage";
import CardResponseMessage from "./Response/Card/CardResponseMessage";
import ContentResponseMessage from "./Response/ContentResponseMessage";
import { ResponseChat } from "./Response/ResponseChat";

export function ChatChunk({ messageId }: { messageId: EntityId }) {
	const message = selectMessageById(store.getState(), messageId)!;
	const divRef = useSmoothScrollToBottom();

	switch (message.type) {
		case "request":
			return (
				<AnimationScope>
					<Stack ref={divRef} maxWidth={"80%"} marginLeft={"auto"} right={"0"}>
						<BasicRequestMessage>
							<Typography sx={{ textAlign: "left" }}>
								{message.message}
							</Typography>
						</BasicRequestMessage>
					</Stack>
				</AnimationScope>
			);
		case "response":
			return (
				<ResponseChat>
					<>
						{message.content.map(
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
												messageID={`${messageId}-${idx}`}
											/>
										);
								}
							}
						)}
					</>
				</ResponseChat>
			);
	}
}

export default memo(ChatChunk);
