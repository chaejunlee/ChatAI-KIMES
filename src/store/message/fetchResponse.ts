import { createAsyncThunk } from "@reduxjs/toolkit";
import { BasicResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import {
	createResponse,
	createResponseContent,
} from "../../utils/Message/createResponse";
import {
	defaultCardResponseMessageData,
	defaultContentResponseMessageData,
} from "../../utils/Message/defaultResponseMessageData";
import { getLexResponse } from "../../utils/Message/getLexResponse";

export const fetchResponse = createAsyncThunk(
	"message/fetchResponse",
	async (message: string) => {
		let content = await getLexResponse(message);

		if (content === null)
			return createResponse([
				defaultContentResponseMessageData,
				defaultCardResponseMessageData,
			]);

		let errorMessage = isErrorMessage(content);
		if (errorMessage) {
			const errorMessageContent = createResponseContent(errorMessage);
			return createResponse(errorMessageContent);
		}

		return createResponse(content);
	}
);

const isErrorMessage = (
	response: BasicResponseMessageType[]
): string | null => {
	if (Object.keys(response).filter((key) => key.includes("error")).length > 0)
		return "답변 생성에 오류가 있었습니다. 잠시 후 다시 시도해주세요.";

	return null;
};
