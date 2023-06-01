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
	ImageResponseCardType,
	imageResponseCardContentType,
} from "../../Interface/Message/ResponseMessageType";
import { createRequest } from "../../utils/Message/createRequest";
import { errorMessage } from "../../utils/Message/errorMessageContent";
import { RootState } from "../store";
import { fetchResponse } from "./fetchResponse";
import { addButtons } from "./buttonsSlice";

interface MessageState {
	status: "idle" | "loading" | "failed" | "succeeded";
}

type MessageWithId = WithId<Message>;

const messageAdapter = createEntityAdapter<MessageWithId>();

const initialState = messageAdapter.getInitialState<MessageState>({
	status: "idle",
});

const testContent = introMessage.content.map((cur) => {
	if (cur.contentType !== "ImageResponseCard") return cur;

	const buttonArray = cur.imageResponseCard.buttons;

	const hasButtons = buttonArray.length > 0;
	if (!hasButtons) return cur;

	let buttonsId = 0;

	const buttonsPayload: WithId<ButtonResponseType>[] = buttonArray.map(
		(cur) => {
			return {
				id: ("button" + buttonsId++) as EntityId,
				...(cur as ButtonResponseType),
			};
		}
	);

	return {
		...cur,
		imageResponseCard: {
			...cur.imageResponseCard,
			buttons: buttonsPayload.map((cur) => cur.id),
		},
	};
});

// for testing
export const manyContent = Array.from({ length: 100 }, (_, i) => {
	return {
		id: ("message" + i) as EntityId,
		type: "response",
		content: testContent,
	};
}) as WithId<Message>[];

const initialStateWithIntroMessage = messageAdapter.addOne(initialState, {
	id: "message0" as EntityId,
	type: "response",
	content: testContent,
});

export const messageSlice = createSlice({
	name: "message",
	initialState: initialStateWithIntroMessage,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			messageAdapter.addOne(state, {
				id: createId(state.ids),
				...createRequest(action.payload),
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchResponse.fulfilled, (state, action) => {
				state.status = "succeeded";
				messageAdapter.addOne(state, {
					id: createId(state.ids),
					...action.payload,
				});
			})
			.addCase(fetchResponse.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchResponse.rejected, (state) => {
				state.status = "failed";
				messageAdapter.addOne(state, {
					id: createId(state.ids),
					type: "response",
					content: errorMessage,
				});
			});
	},
});

export const { addMessage } = messageSlice.actions;

export const {
	selectAll: selectAllMessages,
	selectById: selectMessageById,
	selectIds: selectMessageIds,
} = messageAdapter.getSelectors<RootState>((state) => state.messages);

export default messageSlice.reducer;

const createId = (data: EntityId[]) => {
	return "message" + data.length;
};
