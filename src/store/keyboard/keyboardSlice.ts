import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const keyboardSlice = createSlice({
	name: "keyboard",
	initialState: {
		height: 0,
	},
	reducers: {
		setKeyboardHeight: (state, action: PayloadAction<number>) => {
			state.height = action.payload;
		},
	},
});

export const { setKeyboardHeight } = keyboardSlice.actions;

export const selectKeyboardHeight = (state: RootState) => state.keyboard.height;

export default keyboardSlice.reducer;
