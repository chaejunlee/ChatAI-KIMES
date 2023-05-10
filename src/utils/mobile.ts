const minimumKeyboardHeight = 100;
const windowHeight = window.innerHeight;
const root = document.getElementById("root");
const visualViewport = window.visualViewport;

export const scrollToTop = () => {
	window.scrollTo(0, 0);
};

const scrollToTopTimeout = () => {
	setTimeout(() => {
		scrollToTop();
	}, 500);
};

export const addScrollEventListener = () => {
	scrollToTop();
	window.addEventListener("scroll", scrollToTopTimeout);
};

const removeScrollEventListener = () => {
	window.removeEventListener("scroll", scrollToTopTimeout);
};

export const setBottom = (bottom: number) => {
	if (!root) return;

	root.style.bottom = bottom + "px";
};

export default function setWindowHeight() {
	document.body.style.height = `${windowHeight}px`;
	if (root) setBottom(0);
}

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
	if (!visualViewport) return;

	setTimeout(() => {
		visualViewport.removeEventListener("resize", mobileKeyboardHandler);
	}, 1000);
}

export function detectIOS() {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /iphone|ipad|ipod/.test(userAgent);
}
