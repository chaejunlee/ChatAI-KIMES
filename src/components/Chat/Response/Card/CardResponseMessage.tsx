import { Stack, styled } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { ImageResponseCardType } from "../../../../Interface/Message/ResponseMessageType";
import { BasicResponseMessage } from "../BasicResponseMessage";
import { MessageImage } from "./MessageImage";
import MessageButton from "./MessageButtons";
import { useAppDispatch } from "../../../../store/store";
import { pushButton } from "../../../../store/message/buttonsSlice";

export interface CardResponseMessageTypeProps {
	data: ImageResponseCardType;
}

function CardResponseMessage({ data }: CardResponseMessageTypeProps) {
	const dispatch = useAppDispatch();
	const message = data.imageResponseCard;

	const addClickedBtn = (buttonIndentifier: string) => {
		dispatch(pushButton(buttonIndentifier));
	};

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
	spacing: clamp(8px, 0.3rem, 16px);
	flex-direction: row;
	flex-wrap: wrap;
	column-gap: clamp(8px, 0.3rem, 12px);
	row-gap: clamp(8px, 0.3rem, 12px);
	justify-content: flex-start;
	align-items: flex-start;
`;

export default memo(CardResponseMessage);
