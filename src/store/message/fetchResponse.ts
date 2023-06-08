import { EntityId, createAsyncThunk } from "@reduxjs/toolkit";
import {
	BasicResponseMessageType,
	ButtonResponseType,
	ResponseMessageType,
} from "../../Interface/Message/ResponseMessageType";
import {
	createResponse,
	createResponseContent,
} from "../../utils/Message/createResponse";
import {
	defaultCardResponseMessageData,
	defaultContentResponseMessageData,
} from "../../utils/Message/defaultResponseMessageData";

import { getLexResponse } from "../../api/getLexResponse";
import { getResponse, startingMessage } from "./messageSlice";
import { RootState } from "../store";
import { addButtons } from "./buttonsSlice";
import { WithId } from "../../Interface/Message/Message";
import { AppDispatch } from "../store";

const formatResponse = (content: BasicResponseMessageType[]) => {
	const contentResponse = createResponse(content);

	return createResponse(content);
};

interface fetchResponseProps {
	message: string;
	leaveMessage: boolean;
}

export const DEFAULT_MESSAGE = "자주 묻는 질문";
const isDefaultMessage = (message: string) => {
	return message === DEFAULT_MESSAGE;
};

export const fetchResponse = createAsyncThunk<
	ResponseMessageType,
	fetchResponseProps,
	{
		state: RootState;
		dispatch: AppDispatch;
	}
>(
	"message/fetchResponse",
	async (
		{ message, leaveMessage }: fetchResponseProps,
		{ dispatch, getState }
	) => {
		if (leaveMessage) {
			dispatch(getResponse(message));
		}

		if (isDefaultMessage(message)) {
			return formatResponse(startingMessage);
		}

		let response = await getLexResponse(message);

		if (response === null)
			response = [
				defaultContentResponseMessageData,
				defaultCardResponseMessageData,
			];

		let errorMessage = isErrorMessage(response);
		if (errorMessage) {
			const errorMessageContent = createResponseContent(errorMessage);
			return formatResponse(errorMessageContent);
		}

		const normalizedResponse = response.map((cur) => {
			if (cur.contentType !== "ImageResponseCard") return cur;

			const buttonArray = cur.imageResponseCard.buttons as ButtonResponseType[];

			const hasButtons = buttonArray.length > 0;
			if (!hasButtons) return cur;

			const startingButtonsId = getState().buttons.ids.length;

			const normalizedButtons = normalizeButtons(
				startingButtonsId,
				buttonArray
			);

			dispatch(addButtons(normalizedButtons));

			const normalizedButtonIds = normalizedButtons.map((cur) => cur.id);

			return {
				...cur,
				imageResponseCard: {
					buttons: normalizedButtonIds,
				},
			};
		});

		const responseMessage = formatResponse(normalizedResponse);

		return responseMessage;
	}
);

export function normalizeButtons(
	startingButtonsId: number,
	buttonArray: ButtonResponseType[]
): WithId<ButtonResponseType>[] {
	let buttonsId = startingButtonsId;

	return buttonArray.map((cur) => {
		return {
			id: ("button" + buttonsId++) as EntityId,
			...(cur as ButtonResponseType),
		};
	});
}

const isErrorMessage = (
	response: BasicResponseMessageType[]
): string | null => {
	if (Object.keys(response).filter((key) => key.includes("error")).length > 0)
		return "답변 생성에 오류가 있었습니다. 잠시 후 다시 시도해주세요.";

	return null;
};
