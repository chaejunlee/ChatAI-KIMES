import { Stack } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { memo, useRef } from "react";
import { ImageResponseCardType } from "../../../../Interface/Message/ResponseMessageType";
import { BasicResponseMessage } from "../BasicResponseMessage";
import { MessageImage } from "./MessageImage";
import MessageButton from "./MessageButtons";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicResponseMessage>{subtitle}</BasicResponseMessage>;
}

function CardResponseMessage({ data }: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;
	const clickedBtnListRef = useRef([] as string[]);

	return (
		<>
			{message.imageUrl && <MessageImage message={message} />}
			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
			{message.buttons && (
				<Stack
					spacing={0.5}
					direction={"row"}
					flexWrap={"wrap"}
					columnGap={"0.5rem"}
					rowGap={"0.5rem"}
					justifyContent={"flex-start"}
					alignItems={"flex-start"}
				>
					{message.buttons.map((button) => (
						<MessageButton
							clickedBtnListRef={clickedBtnListRef}
							key={button.toString()}
							button={button as EntityId}
						/>
					))}
				</Stack>
			)}
		</>
	);
}

export default memo(CardResponseMessage);
