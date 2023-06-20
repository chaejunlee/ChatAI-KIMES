import {
	EntityId,
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { WithId } from "../../Interface/Message/Message";
import { ButtonResponseType } from "../../Interface/Message/ResponseMessageType";
import { introMessage } from "../../Data/Message";
import { RootState } from "../store";

type PushableButtonType = ButtonResponseType & { pushed: boolean };
type PushableButtonWithId = WithId<PushableButtonType>;

const buttonAdapter = createEntityAdapter<PushableButtonWithId>();

const buttons = introMessage.content.reduce((acc, cur) => {
	if (cur.contentType !== "ImageResponseCard") return acc;

	const buttonArray = cur.imageResponseCard.buttons;

	const hasButtons = buttonArray.length > 0;
	if (!hasButtons) return acc;

	let buttonsId = 0;

	const buttonsPayload = buttonArray.map((cur) => {
		return {
			id: ("button" + buttonsId++) as EntityId,
			pushed: false,
			...(cur as ButtonResponseType),
		} as PushableButtonWithId;
	});

	return { ...acc, ...buttonsPayload };
}, [] as WithId<PushableButtonWithId>[]);

const initialState = buttonAdapter.addMany(
	buttonAdapter.getInitialState(),
	buttons
);

export const buttonsSlice = createSlice({
	name: "buttons",
	initialState,
	reducers: {
		addButtons: (
			state,
			action: PayloadAction<WithId<ButtonResponseType>[]>
		) => {
			buttonAdapter.addMany(
				state,
				action.payload.map((cur) => {
					return {
						...cur,
						pushed: false,
					};
				})
			);
		},
		pushButton: (state, action: PayloadAction<EntityId>) => {
			buttonAdapter.updateOne(state, {
				id: action.payload,
				changes: {
					pushed: true,
				},
			});
		},
	},
});

export const { addButtons, pushButton } = buttonsSlice.actions;

export const checkButtonPushed = (buttonId: EntityId) => (state: RootState) => {
	const button = selectById(state.buttons, buttonId)!;
	return button.pushed;
};

export default buttonsSlice.reducer;

export const { selectById } = buttonAdapter.getSelectors();
