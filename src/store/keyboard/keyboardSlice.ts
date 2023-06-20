import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
	addScrollEventListener,
	removeKeyboardPopupListener,
	removeScrollEventListener,
} from "./keyboardEventHandler";

const shiftBodyTop = () => {
	const offsetTop = visualViewport?.offsetTop || 0;
	scrollTo(0, 0);
	if (root) root.style.top = offsetTop + "px";
};

export function detectSamsungBrowser() {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /samsungbrowser/.test(userAgent);
}

const visualViewport = window.visualViewport;
const root = document.getElementById("root");
const KEYBOARD_THRESHOLD = 100;

const keyboardSlice = createSlice({
	name: "keyboard",
	initialState: {
		keyboardHeight: 0,
		bottomPadding: 0,
		windowHeight: window.innerHeight,
	},
	reducers: {
		setKeyboardHeight: (state) => {
			if (!visualViewport) return;

			const keyboardHeight = state.windowHeight - visualViewport.height;

			if (keyboardHeight != 0) {
				state.keyboardHeight = keyboardHeight;
			}
			state.bottomPadding = keyboardHeight;
		},
		handleKeyboardPopup: (state) => {
			if (!root) return;
			if (detectSamsungBrowser()) return;

			if (!visualViewport) return;

			const keyboardHeight = state.windowHeight - visualViewport.height;

			if (keyboardHeight != 0) {
				state.keyboardHeight = keyboardHeight;
			}
			state.bottomPadding = keyboardHeight;

			const isKeyboardOpening = state.bottomPadding > KEYBOARD_THRESHOLD;
			if (isKeyboardOpening) {
				if (root)
					root.style.height = state.windowHeight - state.keyboardHeight + "px";
				state.bottomPadding = state.keyboardHeight;
				shiftBodyTop();
				addScrollEventListener();
			}

			const isKeyboardClosing = state.bottomPadding === 0;
			if (isKeyboardClosing) {
				if (root) root.style.height = state.windowHeight + "px";
				state.bottomPadding = 0;
				shiftBodyTop();
				removeScrollEventListener();
				removeKeyboardPopupListener();
			}
		},
		pushInputUp: (state) => {
			if (root)
				root.style.height = state.windowHeight - state.keyboardHeight + "px";
			state.bottomPadding = state.keyboardHeight;
		},
		pullInputDown: (state) => {
			if (root) root.style.height = state.windowHeight + "px";
			state.bottomPadding = 0;
		},
	},
});

export const {
	setKeyboardHeight,
	pushInputUp,
	pullInputDown,
	handleKeyboardPopup,
} = keyboardSlice.actions;

export const selectKeyboardHeight = (state: RootState) =>
	state.keyboard.keyboardHeight;

export default keyboardSlice.reducer;
