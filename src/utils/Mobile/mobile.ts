export const minimumKeyboardHeight = 100;
export const windowHeight = window.innerHeight;
export const root = document.getElementById("root");
export const visualViewport = window.visualViewport;

export const pushDownTop = () => {
	const offsetTop = visualViewport?.offsetTop || 0;
	if (root) root.style.top = offsetTop + "px";
};

const pushDownTopTimeout = () => {
	const offsetTop = visualViewport?.offsetTop || 0;
	if (root) root.style.top = offsetTop + "px";
};

export const addScrollEventListener = () => {
	visualViewport?.addEventListener("scroll", pushDownTopTimeout);
};

export const removeScrollEventListener = () => {
	if (root) root.style.top = "0px";
	visualViewport?.removeEventListener("scroll", pushDownTopTimeout);
};

export default function setWindowHeight() {
	document.body.style.height = `${windowHeight}px`;
}

export function detectSamsungBrowser() {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /samsungbrowser/.test(userAgent);
}

export function detectIOS() {
	const userAgent = window.navigator.userAgent.toLowerCase();
	return /iphone|ipad|ipod/.test(userAgent);
}
