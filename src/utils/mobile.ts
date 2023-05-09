const scrollToTop = () => {
	window.scrollTo(0, 0);
};

const scrollToTopTimeout = () => {
	setTimeout(() => {
		scrollToTop();
	}, 500);
};

export const addScrollEventListener = () => {
	window.addEventListener("scroll", scrollToTopTimeout);
};

const removeScrollEventListener = () => {
	window.removeEventListener("scroll", scrollToTopTimeout);
};

const minimumKeyboardHeight = 100;
const windowHeight = window.innerHeight;
const root = document.getElementById("root");
const visualViewport = window.visualViewport;

export default function setWindowHeight() {
	document.body.style.height = `${windowHeight}px`;
	if (root) root.style.bottom = "0px";
}

const mobileKeyboardHandler = (e: Event) => {
	const visualViewportEvent = e.target as VisualViewport;
	const viewportHeight = visualViewportEvent.height;
	const keyboardHeight = windowHeight - viewportHeight;

	if (!root) return;

	if (keyboardHeight > minimumKeyboardHeight) {
		addScrollEventListener();
		root.style.bottom = `${keyboardHeight}px`;
	} else {
		root.style.transition = "bottom 0.5s ease-in-out";
		root.style.bottom = "0px";
		removeScrollEventListener();
		root.style.transition = "none";
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
