import store from "../store";
import { handleKeyboardPopup, pushInputUp } from "./keyboardSlice";

const root = document.getElementById("root");

export const addKeyboardPopupListener = () => {
	store.dispatch(pushInputUp());
	visualViewport?.addEventListener("resize", mobileKeyboardHandler);
};

export const removeKeyboardPopupListener = () => {
	visualViewport?.removeEventListener("resize", mobileKeyboardHandler);
};

const mobileKeyboardHandler = () => {
	store.dispatch(handleKeyboardPopup());
};

export const addScrollEventListener = () => {
	visualViewport?.addEventListener("scroll", scrollHandler);
};

export const removeScrollEventListener = () => {
	if (root) root.style.top = "0px";
	visualViewport?.removeEventListener("scroll", scrollHandler);
};

const scrollHandler = () => {
	const offsetTop = visualViewport?.offsetTop || 0;
	scrollTo(0, 0);

	if (root) root.style.top = offsetTop + "px";
};
