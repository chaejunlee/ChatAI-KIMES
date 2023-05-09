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

export function setWindowHeight() {
	document.body.style.height = `${windowHeight}px`;
	if (root) root.style.bottom = "0px";
}

export default function mobileKeyboardHandler() {
	const visualViewport = window.visualViewport;

	if (!visualViewport) return;

	visualViewport.addEventListener("resize", (e) => {
		const visualViewportEvent = e.target as VisualViewport;
		const viewportHeight = visualViewportEvent.height;
		const keyboardHeight = windowHeight - viewportHeight;

		if (!root) return;

		if (keyboardHeight > minimumKeyboardHeight) {
			scrollToTop();
			addScrollEventListener();
			root.style.bottom = `${keyboardHeight}px`;
		} else {
			root.style.transition = "bottom 0.5s ease-in-out";
			root.style.bottom = "0px";
			removeScrollEventListener();
			root.style.transition = "none";
		}
	});
}

export function detectIOS() {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /iphone|ipad|ipod/.test(userAgent);
}
