export const windowHeight = window.innerHeight;
export const root = document.getElementById("root");
export const visualViewport = window.visualViewport;

const shiftBodyTop = () => {
	const offsetTop = visualViewport?.offsetTop || 0;
	if (root) root.style.top = offsetTop + "px";
};

export const addScrollEventListener = () => {
	visualViewport?.addEventListener("scroll", shiftBodyTop);
};

export const removeScrollEventListener = () => {
	if (root) root.style.top = "0px";
	visualViewport?.removeEventListener("scroll", shiftBodyTop);
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
