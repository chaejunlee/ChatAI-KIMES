export const minimumKeyboardHeight = 100;
export const windowHeight = window.innerHeight;
export const root = document.getElementById("root");
export const visualViewport = window.visualViewport;

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

export const removeScrollEventListener = () => {
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

export function detectIOS() {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /iphone|ipad|ipod/.test(userAgent);
}
