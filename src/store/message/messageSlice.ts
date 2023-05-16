import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { introMessage } from "../../Data/Message";
import Message from "../../Interface/Message/Message";
import { ResponseMessageType } from "../../Interface/Message/ResponseMessageType";
import { createRequest } from "../../utils/Message/createRequest";
import { fetchResponse } from "./fetchResponse";
import { errorMessage } from "../../utils/Message/errorMessageContent";

interface MessageState {
	data: Message[];
	status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: MessageState = {
	data: [introMessage],
	status: "idle",
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<string>) => {
			state.data.push(createRequest(action.payload));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchResponse.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data.push(action.payload);
			})
			.addCase(fetchResponse.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchResponse.rejected, (state) => {
				state.status = "failed";
				state.data.push({
					type: "response",
					content: errorMessage,
				} as ResponseMessageType);
			});
	},
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
