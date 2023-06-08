import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import messageReducer from "./message/messageSlice";
import buttonsReducer from "./message/buttonsSlice";
import keyboardReducer from "./keyboard/keyboardSlice";

export const store = configureStore({
	reducer: {
		messages: messageReducer,
		buttons: buttonsReducer,
		keyboard: keyboardReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
