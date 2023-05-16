import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContentResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import {
	createResponse,
	createResponseContent,
} from "../../utils/Message/createResponse";
import { getLexResponse } from "./getLexResponse";

export const fetchResponse = createAsyncThunk(
	"message/fetchResponse",
	async (message: string) => {
		let content = await getLexResponse(message);

		let errorMessage = isError(content);
		if (errorMessage !== null) {
			const errorMessageContent = createResponseContent(errorMessage);
			return createResponse(errorMessageContent);
		}

		return createResponse(content);
	}
);

const isError = (
	response: ContentResponseMessageType[] | null
): string | null => {
	if (response === null)
		return "답변을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.";
	if (Object.keys(response).filter((key) => key.includes("error")).length > 0)
		return "답변 생성에 오류가 있었습니다. 잠시 후 다시 시도해주세요.";

	return null;
};
