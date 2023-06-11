import {
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../Interface/Message/ResponseMessageType";

export const defaultCardResponseMessageData: ImageResponseCardType = {
	contentType: "ImageResponseCard",
	imageResponseCard: {
		buttons: [
			{
				text: "자주 묻는 질문 보기",
				value: "자주 묻는 질문",
			},
		],
	},
};

export const defaultContentResponseMessageData: ContentResponseMessageType = {
	contentType: "PlainText",
	content: "다른 문의사항이 있으신가요?",
};
