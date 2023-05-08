const scrollToTop = () => {
	window.scrollTo(0, 0);
};

const scrollToTopTimeout = () => {
	setTimeout(() => {
		scrollToTop();
	}, 100);
};

const addScrollEventListener = () => {
	window.addEventListener("scroll", scrollToTopTimeout);
};

const removeScrollEventListener = () => {
	window.removeEventListener("scroll", scrollToTopTimeout);
};

const minimumKeyboardHeight = 100;
const windowHeight = window.innerHeight;
const root = document.getElementById("root");

const getRoot = () => {
	if (!root) throw new Error("root is null");
	return root;
};

export function setWindowHeight() {
	document.body.style.height = `${windowHeight}px`;
	getRoot().style.bottom = "0px";
}

export default function mobileKeyboardHandler() {
	const visualViewport = window.visualViewport;

	if (!visualViewport) return;

	visualViewport.addEventListener("resize", (e) => {
		const visualViewportEvent = e.target as VisualViewport;
		const viewportHeight = visualViewportEvent.height;
		const keyboardHeight = windowHeight - viewportHeight;

		if (keyboardHeight > minimumKeyboardHeight) {
			addScrollEventListener();
			getRoot().style.bottom = `${keyboardHeight}px`;
		} else {
			getRoot().style.bottom = "0px";
			removeScrollEventListener();
		}
	});
}
