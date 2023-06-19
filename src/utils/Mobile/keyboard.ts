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

	const heightDiff = newHeightDifference - currHeightDifference;
	const isKeyboardOpening = heightDiff > KEYBOARD_THRESHOLD;
	const isKeyboardClosing = heightDiff < KEYBOARD_THRESHOLD * -1;

	if (isKeyboardOpening) {
		_keyboardHeight = currHeightDifference = newHeightDifference;
		setWithKeyboardHeight();
		addScrollEventListener();
	}
	if (isKeyboardClosing) {
		_keyboardHeight = currHeightDifference = newHeightDifference;
		setFullHeight();
		removeScrollEventListener();
		removeKeyboardPopupListener();
	}
};

export function setFullHeight() {
	if (!root) return;
	root.style.height = document.body.style.height;
}

export function setWithKeyboardHeight() {
	if (!root) return;
	root.style.height = `${windowHeight - _keyboardHeight}px`;
}

export function addKeyboardPopupListener() {
	window.visualViewport?.addEventListener("resize", mobileKeyboardHandler);
}

export function removeKeyboardPopupListener() {
	setTimeout(() => {
		window.visualViewport?.removeEventListener("resize", mobileKeyboardHandler);
	}, 600);
}
