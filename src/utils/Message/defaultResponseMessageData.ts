import {
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../Interface/Message/ResponseMessageType";

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

export const defaultContentResponseMessageData: ContentResponseMessageType = {
	contentType: "PlainText",
	content: "질문을 제대로 알아듣지 못했어요. 준비된 답변을 보시겠어요?",
};
