import {
	windowHeight,
	root,
	minimumKeyboardHeight,
	addScrollEventListener,
	setBottom,
	removeScrollEventListener,
	visualViewport,
	detectSamsungBrowser,
} from "./mobile";

export function getKeyboardHeight(e: Event | null) {
	let visualViewport: VisualViewport;
	if (e) {
		visualViewport = e.target as VisualViewport;
	} else {
		visualViewport = window.visualViewport as VisualViewport;
	}
	const viewportHeight = visualViewport.height;
	const keyboardHeight = windowHeight - viewportHeight;

	return keyboardHeight;
}
const mobileKeyboardHandler = (e: Event) => {
	const keyboardHeight = getKeyboardHeight(e);

	if (!root) return;
	if (detectSamsungBrowser()) return;

	if (keyboardHeight > minimumKeyboardHeight) {
		addScrollEventListener();
		setBottom(keyboardHeight);
		root.style.transition = "none";
	} else {
		setBottom(0);
		root.style.transition = "bottom 200ms ease-in-out";
		removeScrollEventListener();
		removeKeyboardPopupListener();
	}
};

export function addKeyboardPopupListener() {
	if (!visualViewport) return;

	visualViewport.addEventListener("resize", mobileKeyboardHandler);
}

export function removeKeyboardPopupListener() {
	setTimeout(() => {
		if (!visualViewport) return;
		visualViewport.removeEventListener("resize", mobileKeyboardHandler);
	}, 600);
}
