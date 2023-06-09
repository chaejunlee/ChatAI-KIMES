import {
	addScrollEventListener,
	detectSamsungBrowser,
	minimumKeyboardHeight,
	removeScrollEventListener,
	root,
	visualViewport,
	windowHeight,
} from "./mobile";

let _keyboardHeight = 0;

const messageInput = document.querySelector(".message-input");
const messageInputHeight = messageInput?.clientHeight || 0;

export function getKeyboardHeight() {
	return _keyboardHeight;
}

export function getCurrentKeyboardHeight(e: Event) {
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

export function setKeyboardHeight(e: Event) {}

const mobileKeyboardHandler = (e: Event) => {
	let prevKeyboardHeight = _keyboardHeight;
	let currKeyboardHeight = getCurrentKeyboardHeight(e);
	console.log(prevKeyboardHeight, currKeyboardHeight);
	const diff = currKeyboardHeight - prevKeyboardHeight + messageInputHeight;
	const KEYBOARD_OPEN = prevKeyboardHeight > 0;
	const KEYBOARD_CLOSING = diff < -10;

	if (!KEYBOARD_OPEN) {
		_keyboardHeight = currKeyboardHeight;
		prevKeyboardHeight = currKeyboardHeight;
	}

	if (KEYBOARD_CLOSING) prevKeyboardHeight = currKeyboardHeight;

	if (!root) return;
	if (detectSamsungBrowser()) return;

	const viewportWithKeyboard = windowHeight - prevKeyboardHeight;
	const originalHeight = document.body.style.height;

	if (prevKeyboardHeight > minimumKeyboardHeight) {
		root.style.height = `${viewportWithKeyboard}px`;
		root.style.transition = "none";
		addScrollEventListener();
	} else {
		root.style.height = originalHeight;
		root.style.transition = "height 200ms ease-in-out";
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
