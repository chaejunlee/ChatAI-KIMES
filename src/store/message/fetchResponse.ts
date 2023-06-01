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
import { addMessage } from "./messageSlice";
import { RootState } from "../store";
import { addButtons } from "./buttonsSlice";
import { WithId } from "../../Interface/Message/Message";

const getResponse = (content: BasicResponseMessageType[]) => {
	const contentResponse = createResponse(content);

	return createResponse(content);
};

interface fetchResponseProps {
	message: string;
	leaveMessage: boolean;
}

export const fetchResponse = createAsyncThunk<
	ResponseMessageType,
	fetchResponseProps,
	{
		state: RootState;
	}
>(
	"message/fetchResponse",
	async (
		{ message, leaveMessage }: fetchResponseProps,
		{ dispatch, getState }
	) => {
		if (leaveMessage) {
			dispatch(addMessage(message));
		}
		const response = await getLexResponse(message);

		if (response === null)
			return createResponse([
				defaultContentResponseMessageData,
				defaultCardResponseMessageData,
			]);

		let errorMessage = isErrorMessage(response);
		if (errorMessage) {
			const errorMessageContent = createResponseContent(errorMessage);
			return createResponse(errorMessageContent);
		}

		const normalizedResponse = response.map((cur) => {
			if (cur.contentType !== "ImageResponseCard") return cur;

			const buttonArray = cur.imageResponseCard.buttons;

			const hasButtons = buttonArray.length > 0;
			if (!hasButtons) return cur;

			const { buttons } = getState();
			let buttonsId = buttons.ids.length;

			const buttonsPayload: WithId<ButtonResponseType>[] = buttonArray.map(
				(cur) => {
					return {
						id: ("button" + buttonsId++) as EntityId,
						...(cur as ButtonResponseType),
					};
				}
			);

			dispatch(addButtons(buttonsPayload));

			return {
				...cur,
				imageResponseCard: {
					...cur.imageResponseCard,
					buttons: buttonsPayload.map((cur) => cur.id),
				},
			};
		});

		const responseMessage = getResponse(normalizedResponse);

		return responseMessage;
	}
);

const isErrorMessage = (
	response: BasicResponseMessageType[]
): string | null => {
	if (Object.keys(response).filter((key) => key.includes("error")).length > 0)
		return "답변 생성에 오류가 있었습니다. 잠시 후 다시 시도해주세요.";

	return null;
};
