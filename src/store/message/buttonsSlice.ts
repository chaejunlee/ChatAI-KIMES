import {
	EntityId,
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { WithId } from "../../Interface/Message/Message";
import { ButtonResponseType } from "../../Interface/Message/ResponseMessageType";
import { introMessage } from "../../Data/Message";

type ButtonWithId = WithId<ButtonResponseType>;

const buttonAdapter = createEntityAdapter<ButtonWithId>();

const buttons = introMessage.content.reduce((acc, cur) => {
	if (cur.contentType !== "ImageResponseCard") return acc;

	const buttonArray = cur.imageResponseCard.buttons;

	const hasButtons = buttonArray.length > 0;
	if (!hasButtons) return acc;

	let buttonsId = 0;

	const buttonsPayload = buttonArray.map((cur) => {
		return {
			id: ("button" + buttonsId++) as EntityId,
			...(cur as ButtonResponseType),
		} as ButtonWithId;
	});

	return { ...acc, ...buttonsPayload };
}, [] as WithId<ButtonResponseType>[]);

const initialState = buttonAdapter.addMany(
	buttonAdapter.getInitialState(),
	buttons
);

export const buttonsSlice = createSlice({
	name: "buttons",
	initialState,
	reducers: {
		addButtons: (state, action: PayloadAction<ButtonWithId[]>) => {
			buttonAdapter.addMany(state, action.payload);
		},
	},
});

export const { addButtons } = buttonsSlice.actions;

export default buttonsSlice.reducer;

export const { selectById } = buttonAdapter.getSelectors();
