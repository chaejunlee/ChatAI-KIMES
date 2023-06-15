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

const mobileKeyboardHandler = (e: Event) => {
	if (!root) return;
	if (detectSamsungBrowser()) return;

	let currHeightDifference = _keyboardHeight;
	let newHeightDifference = getWindowViewportHeightDifference();

	const bodyHeight = document.body.style.height;

	const heightDiff = newHeightDifference - currHeightDifference;
	const isKeyboardOpening = heightDiff > KEYBOARD_THRESHOLD;
	const isKeyboardClosing = heightDiff < KEYBOARD_THRESHOLD * -1;

	if (isKeyboardOpening) {
		console.log("keyboard opening");
		_keyboardHeight = currHeightDifference = newHeightDifference;
		const viewportWithKeyboardOn = windowHeight - currHeightDifference;
		console.log("viewportWithKeyboardOn", viewportWithKeyboardOn);
		root.style.setProperty(
			"--keyboard-height",
			`${currHeightDifference + 100}px`
		);
		// root.style.height = `${viewportWithKeyboardOn}px`;
		addScrollEventListener();
	}
	if (isKeyboardClosing) {
		_keyboardHeight = currHeightDifference = newHeightDifference;
		root.style.height = bodyHeight;
		root.style.setProperty("--keyboard-height", "0px");
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
