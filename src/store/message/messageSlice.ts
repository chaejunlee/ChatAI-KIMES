import {
	EntityId,
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { introMessage } from "../../Data/Message";
import { Message, WithId } from "../../Interface/Message/Message";
import {
	ButtonResponseType,
	ContentResponseMessageType,
	ImageResponseCardType,
} from "../../Interface/Message/ResponseMessageType";
import { createRequest } from "../../utils/Message/createRequest";
import { errorMessage } from "../../utils/Message/errorMessageContent";
import { RootState } from "../store";
import { fetchResponse, normalizeButtons } from "./fetchResponse";

interface MessageState {
	status: "idle" | "loading" | "failed" | "succeeded";
	targetMessageId: EntityId;
}

type MessageWithId = WithId<Message>;

const messageAdapter = createEntityAdapter<MessageWithId>();

const initialState = messageAdapter.getInitialState<MessageState>({
	status: "idle",
	targetMessageId: "message0" as EntityId,
});

export const startingMessage = introMessage.content.map((cur) => {
	if (cur.contentType !== "ImageResponseCard") return cur;

	const buttonArray = cur.imageResponseCard.buttons as ButtonResponseType[];

	const hasButtons = buttonArray.length > 0;
	if (!hasButtons) return cur;

	let buttonsId = 0;

	const buttonsPayload = normalizeButtons(buttonsId, buttonArray);

	const normalizedResponse = structuredClone(cur);
	normalizedResponse.imageResponseCard.buttons = buttonsPayload.map(
		(cur) => cur.id
	);

	return normalizedResponse;
});

// for testing
const TESTING = false;
export const manyContent = Array.from({ length: 100 }, (_, i) => {
	return {
		id: ("message" + i) as EntityId,
		type: "response",
		content: startingMessage,
	};
}) as WithId<Message>[];

const initialStateWithIntroMessage = TESTING
	? messageAdapter.addMany(initialState, manyContent)
	: messageAdapter.addOne(initialState, {
			id: "message0" as EntityId,
			type: "response",
			content: startingMessage,
	  });

export const messageSlice = createSlice({
	name: "message",
	initialState: initialStateWithIntroMessage,
	reducers: {
		getResponse: (state, action: PayloadAction<string>) => {
			messageAdapter.addOne(state, {
				id: createId(state.ids),
				...createRequest(action.payload),
			});
		},
		addMessage: (
			state,
			action: PayloadAction<
				(ContentResponseMessageType | ImageResponseCardType)[]
			>
		) => {
			messageAdapter.addOne(state, {
				id: createId(state.ids),
				type: "response",
				content: action.payload,
			});
		},
		getPreviousMessage: (state) => {
			if (state.targetMessageId === "bottom") {
				state.targetMessageId = state.ids[state.ids.length - 1];
				return;
			}
			if (state.targetMessageId === state.ids[0]) {
				return;
			}
			const targetMessageIndex = state.ids.indexOf(state.targetMessageId);
			if (targetMessageIndex === 0) {
				return;
			}
			state.targetMessageId = state.ids[targetMessageIndex - 1];
		},
		getNextMessage: (state) => {
			if (state.targetMessageId === "bottom") {
				return;
			}
			const targetMessageIndex = state.ids.indexOf(state.targetMessageId);
			if (targetMessageIndex === state.ids.length - 1) {
				state.targetMessageId = "bottom";
				return;
			}
			state.targetMessageId = state.ids[targetMessageIndex + 1];
			return;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchResponse.fulfilled, (state, action) => {
				const id = createId(state.ids);
				state.status = "succeeded";
				messageAdapter.addOne(state, {
					id: id,
					...action.payload,
				});
				state.targetMessageId = id;
			})
			.addCase(fetchResponse.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchResponse.rejected, (state) => {
				const id = createId(state.ids);
				state.status = "failed";
				messageAdapter.addOne(state, {
					id: id,
					type: "response",
					content: errorMessage,
				});
				state.targetMessageId = id;
			});
	},
});

export const { getResponse, addMessage, getNextMessage, getPreviousMessage } =
	messageSlice.actions;

export const hasMessageReachedBottom = (state: RootState) =>
	state.messages.targetMessageId === "bottom";
export const hasMessageReachedTop = (state: RootState) =>
	state.messages.targetMessageId === state.messages.ids[0];

export const {
	selectAll: selectAllMessages,
	selectById: selectMessageById,
	selectIds: selectMessageIds,
} = messageAdapter.getSelectors<RootState>((state) => state.messages);

export default messageSlice.reducer;

const createId = (data: EntityId[]) => {
	return "message" + data.length;
};
