import { ImageResponseCardType } from "../../../Interface/Message/ResponseMessageType";
import CardResponseMessage from "../../Messages/CardResponseMessage";
import ContentResponseMessage from "../../Messages/ContentResponseMessage";

export const defaultCardResponseMessageData: ImageResponseCardType = {
	contentType: "ImageResponseCard",
	imageResponseCard: {
		buttons: [
			{
				text: "메뉴 보기",
				value: "메인 메뉴",
			},
		],
	},
};

export const DefaultCardResponseMessage = ({
	onButtonClick,
	messageIndex,
}: {
	onButtonClick: (text: string) => void;
	messageIndex: number;
}) => {
	return (
		<>
			<ContentResponseMessage
				message={{
					contentType: "PlainText",
					content:
						"질문을 제대로 알아듣지 못했어요. 준비된 답변을 보시겠어요? ",
				}}
			/>
			<CardResponseMessage
				data={defaultCardResponseMessageData}
				onButtonClick={onButtonClick}
				messageIndex={messageIndex}
				contentIndex={-1}
			/>
		</>
	);
};
