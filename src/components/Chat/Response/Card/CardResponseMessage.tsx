import { Stack, styled } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { memo, useRef } from "react";
import { ImageResponseCardType } from "../../../../Interface/Message/ResponseMessageType";
import { BasicResponseMessage } from "../BasicResponseMessage";
import { MessageImage } from "./MessageImage";
import MessageButton from "./MessageButtons";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
}

function CardResponseMessage({ data }: CardResponseMessageTypeProps) {
	const message = data.imageResponseCard;
	const clickedBtnListRef = useRef([] as string[]);

	const addClickedBtn = (buttonIndentifier: string) => {
		clickedBtnListRef.current.push(buttonIndentifier);
	};
	const checkBtnClicked = (buttonIndentifier: string) =>
		clickedBtnListRef.current.includes(buttonIndentifier);

	return (
		<>
			{message.imageUrl && <MessageImage message={message} />}
			{message.subtitle && <MessageSubtitle subtitle={message.subtitle} />}
			{message.buttons && (
				<MessageButtons>
					{message.buttons.map((button) => (
						<MessageButton
							key={button.toString()}
							buttonId={button as EntityId}
							checkBtnClicked={checkBtnClicked}
							addClickedBtn={addClickedBtn}
						/>
					))}
				</MessageButtons>
			)}
		</>
	);
}

function MessageSubtitle({ subtitle }: { subtitle: string }) {
	return <BasicResponseMessage>{subtitle}</BasicResponseMessage>;
}

const MessageButtons = styled(Stack)`
	spacing: 0.5rem;
	direction: row;
	flex-wrap: wrap;
	column-gap: 0.5rem;
	row-gap: 0.5rem;
	justify-content: flex-start;
	align-items: flex-start;
`;

export default memo(CardResponseMessage);
