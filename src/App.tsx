import "./App.css";
import Header from "./Layout/Header";
import ChatPage from "./page/ChatPage";

function App() {
	return (
		<>
			<Header />
			<ChatPage />
		</>
	);
}

const visualViewport = window.visualViewport;

if (visualViewport) {
	const windowHeight = window.innerHeight;
	document.body.style.height = `${windowHeight}px`;
	const minimumKeyboardHeight = 100;

	const root = document.getElementById("root");
	if (!root) throw new Error("root is null");
	root.style.bottom = "0px";

	visualViewport.addEventListener("resize", (e) => {
		const visualViewportEvent = e.target as VisualViewport;
		const viewportHeight = visualViewportEvent.height;
		const keyboardHeight = windowHeight - viewportHeight;

		scrollToTop();
		if (keyboardHeight > minimumKeyboardHeight) {
			addScrollEventListener();
			root.style.bottom = `${keyboardHeight}px`;
		} else {
			root.style.bottom = "0px";
			removeScrollEventListener();
		}
	});
}

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

export default App;
