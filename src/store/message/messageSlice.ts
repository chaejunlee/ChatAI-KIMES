import { EntityId, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { introMessage } from "../../Data/Message";
import { createRequest } from "../../utils/Message/createRequest";
import { fetchResponse } from "./fetchResponse";
import { errorMessage } from "../../utils/Message/errorMessageContent";
import { RootState } from "../store";
import { ResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import RequestMessageType from "../../Interface/Message/RequestMessageType";

export interface MessageWithId {
	content: ResponseMessageType | RequestMessageType;
	id: number;
}

interface MessageState {
	status: "idle" | "loading" | "failed" | "succeeded";
}

const messageAdapter = createEntityAdapter<MessageWithId>();

const initialState = messageAdapter.getInitialState<MessageState>({
	status: "idle",
});

const initialStateWithIntroMessage = messageAdapter.addOne(initialState, {
	id: 0,
	content: introMessage,
});

export const messageSlice = createSlice({
	name: "message",
	initialState: initialStateWithIntroMessage,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			messageAdapter.addOne(state, {
				id: createId(state.ids),
				content: createRequest(action.payload),
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchResponse.fulfilled, (state, action) => {
				state.status = "succeeded";
				messageAdapter.addOne(state, {
					id: createId(state.ids),
					content: action.payload,
				});
			})
			.addCase(fetchResponse.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchResponse.rejected, (state) => {
				state.status = "failed";
				messageAdapter.addOne(state, {
					id: createId(state.ids),
					content: {
						type: "response",
						content: errorMessage,
					},
				} as MessageWithId);
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
	return data.length;
};
