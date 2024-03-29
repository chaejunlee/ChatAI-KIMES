import {
	EntityId,
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { introMessage } from "../../Data/Message";
import { Message, WithId } from "../../Interface/Message/Message";
import {
	BasicResponseMessageType,
	ButtonResponseType,
} from "../../Interface/Message/ResponseMessageType";
import { createRequest } from "../../utils/Message/createRequest";
import { errorMessage } from "../../utils/Message/errorMessageContent";
import { RootState } from "../store";
import { fetchResponse, normalizeButtons } from "./fetchResponse";

interface MessageState {
	status: "idle" | "loading" | "failed" | "succeeded";
	focusedMessageId: EntityId;
}

type MessageWithId = WithId<Message>;

export const BOTTOM = "FOCUS_CHAT";

const messageAdapter = createEntityAdapter<MessageWithId>();

const initialState = messageAdapter.getInitialState<MessageState>({
	status: "idle",
	focusedMessageId: "message0" as EntityId,
});

let buttonsId = 0;

export const startingMessage = introMessage.content.map((cur) => {
	if (cur.contentType !== "ImageResponseCard") return cur;

	const buttonArray = cur.imageResponseCard.buttons as ButtonResponseType[];

	const hasButtons = buttonArray.length > 0;
	if (!hasButtons) return cur;

	const buttonsPayload = buttonArray.map((cur) => {
		return {
			id: ("button" + buttonsId++) as EntityId,
			...(cur as ButtonResponseType),
		};
	});

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
		addMessage: (state, action: PayloadAction<BasicResponseMessageType[]>) => {
			messageAdapter.addOne(state, {
				id: createId(state.ids),
				type: "response",
				content: action.payload,
			});
		},
		getPreviousMessage: (state) => {
			if (state.focusedMessageId === BOTTOM) {
				state.focusedMessageId = state.ids.at(-1)!;
				return;
			}
			const isFirstMessage = state.focusedMessageId === state.ids[0];
			if (isFirstMessage) return;

			const targetMessageIndex = state.ids.indexOf(state.focusedMessageId);
			if (targetMessageIndex === 0) return;
			state.focusedMessageId = state.ids[targetMessageIndex - 1];
		},
		getNextMessage: (state) => {
			const hasReachedBottom = state.focusedMessageId === BOTTOM;
			if (hasReachedBottom) return;
			const isLastMessage = state.focusedMessageId === state.ids.at(-1);
			if (isLastMessage) {
				state.focusedMessageId = BOTTOM;
				return;
			}
			const targetMessageIndex = state.ids.indexOf(state.focusedMessageId);
			state.focusedMessageId = state.ids[targetMessageIndex + 1];
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
				state.focusedMessageId = id;
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
				state.focusedMessageId = id;
			});
	},
});

export const { getResponse, addMessage, getNextMessage, getPreviousMessage } =
	messageSlice.actions;

export const hasMessageReachedBottom = (state: RootState) =>
	state.messages.focusedMessageId === BOTTOM;
export const hasMessageReachedTop = (state: RootState) =>
	state.messages.focusedMessageId === state.messages.ids[0];
export const selectFocusedMessageId =
	(messageId: EntityId) => (state: RootState) => {
		const targetId = state.messages.focusedMessageId;
		return targetId === messageId;
	};
export const isMessageStatusLoading = (state: RootState) =>
	state.messages.status === "loading";

export const {
	selectAll: selectAllMessages,
	selectById: selectMessageById,
	selectIds: selectMessageIds,
} = messageAdapter.getSelectors<RootState>((state) => state.messages);

export default messageSlice.reducer;

const createId = (data: EntityId[]) => {
	return "message" + data.length;
};
