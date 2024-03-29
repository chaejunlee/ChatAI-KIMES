import {
	ContentResponseMessageType,
	ImageResponseCardType,
	ResponseMessageType,
} from "../Interface/Message/ResponseMessageType";
import RequestMessageType from "../Interface/Message/RequestMessageType";
import { Message } from "../Interface/Message/Message";

export const introMessage: ResponseMessageType = {
	content: [
		{
			contentType: "PlainText",
			content:
				"안녕하세요! 채티(ChatAI-B)입니다! 저에게 유방검사 혹은 유방암 관련한 궁금한 점을 질문해주세요.",
		},
		{
			contentType: "PlainText",
			content:
				"아래의 버튼은 사람들이 자주 묻는 질문이에요:)",
		},
		{
			contentType: "ImageResponseCard",
			imageResponseCard: {
				buttons: [
					{
						text: "유방 촬영술에서 4매 촬영하는 이유는?",
						value: "유방 촬영술에서 4매 촬영하는 이유는?",
					},
					{
						text: "유방촬영 시 압박하는 이유?",
						value: "유방촬영 시 압박하는 이유?",
					},
					{
						text: "유방 초음파를 하는데 유방 촬영술이 꼭 필요한가요?",
						value: "유방 초음파를 하는데 유방 촬영술이 꼭 필요한가요?",
					},
					{
						text: "유방 검사가 꼭 필요한 증상은?",
						value: "유방 검사가 꼭 필요한 증상은?",
					},
					{
						text: "유방 자동 초음파는 무엇인가요?",
						value: "유방 자동 초음파는 무엇인가요?",
					},
				],
				title: "조직 구성(Tissue Composition)",
			},
		}
	],
	type: "response",
};

export const initRequest: RequestMessageType = {
	type: "request",
	message: "조직 구성",
	userId: "123",
};

export const sampleTextResponse: ContentResponseMessageType = {
	contentType: "PlainText",
	content:
		"정상 유방에서 유방조직(tissue composition)의 구성은 매우 다양합니다. 유방 배경 에코결은 병변 발견의 민감도에 영향을 줄 수 있습니다.",
};

export const sampleImageResponse: ImageResponseCardType = {
	contentType: "ImageResponseCard",
	imageResponseCard: {
		buttons: [
			{
				text: "균질한 배경(Homogeneous background echotexture)",
				value: "균질한 배경에 대해 알려줘",
			},
			{
				text: "불균질한 배경(Heterogeneous background echotexture)",
				value: "불균질한 배경에 대해 알려줘",
			},
		],
		imageUrl:
			"https://beamworks-platform-backend-dev.s3.ap-northeast-2.amazonaws.com/%ED%99%94%EB%A9%B4+%EC%BA%A1%EC%B2%98+2023-03-20+105909.png",
		subtitle: "자세한 설명과 예시에 대해 알고싶으면 아래의 버튼을 클릭하세요.",
		title: "조직 구성(Tissue Composition)",
	},
};

export const sampleCardResponse: ResponseMessageType = {
	type: "response",
	content: [sampleTextResponse, sampleImageResponse],
};
const sampleMessages: Message[] = [
	introMessage,
	initRequest,
	sampleCardResponse,
];
export default sampleMessages;
//https://beamworks-platform-backend-dev.s3.ap-northeast-2.amazonaws.com/%ED%99%94%EB%A9%B4+%EC%BA%A1%EC%B2%98+2023-03-20+105909.png
