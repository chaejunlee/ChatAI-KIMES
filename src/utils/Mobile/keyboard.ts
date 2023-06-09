import {
	addScrollEventListener,
	detectSamsungBrowser,
	removeScrollEventListener,
	root,
	windowHeight,
} from "./mobile";

const KEYBOARD_THRESHOLD = 100;
let _keyboardHeight = 0;

export function getWindowViewportHeightDifference() {
	let visualViewport = window.visualViewport;
	if (!visualViewport) return _keyboardHeight;
	const viewportHeight = visualViewport.height;
	const keyboardHeight = windowHeight - viewportHeight;

	return keyboardHeight;
}

export function setKeyboardHeight(e: Event) {}

const mobileKeyboardHandler = (e: Event) => {
	if (!root) return;
	if (detectSamsungBrowser()) return;

	let currHeightDifference = _keyboardHeight;
	let newHeightDifference = getWindowViewportHeightDifference();

	const messageInputHeight =
		document.querySelector(".message-input")?.clientHeight || 0;
	const bodyHeight = document.body.style.height;

	const heightDiff =
		newHeightDifference - currHeightDifference + messageInputHeight;
	const isKeyboardOpening =
		currHeightDifference === 0 && heightDiff > KEYBOARD_THRESHOLD;
	const isKeyboardClosing = heightDiff < KEYBOARD_THRESHOLD * -1;

	if (isKeyboardOpening) {
		_keyboardHeight = currHeightDifference = newHeightDifference;
		const viewportWithKeyboardOn = windowHeight - currHeightDifference;
		root.style.height = `${viewportWithKeyboardOn}px`;
		// root.style.transition = "none";
		addScrollEventListener();
	}
	if (isKeyboardClosing) {
		_keyboardHeight = currHeightDifference = newHeightDifference;
		root.style.height = bodyHeight;
		root.style.transition = "";
		removeScrollEventListener();
		removeKeyboardPopupListener();
	}
};

export function addKeyboardPopupListener() {
	window.visualViewport?.addEventListener("resize", mobileKeyboardHandler);
}

export function removeKeyboardPopupListener() {
	setTimeout(() => {
		window.visualViewport?.removeEventListener("resize", mobileKeyboardHandler);
	}, 600);
}
