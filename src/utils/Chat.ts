import { MutableRefObject, useEffect, useRef } from "react";

export const smoothScrollToBottom = (
	element: MutableRefObject<HTMLDivElement | null>
) => {
	if (element.current === null) return;

	element.current.style.scrollMarginBottom = "10rem";
	element.current.scrollIntoView({
		behavior: "smooth",
		block: "end",
	});
};

export const useSmoothScrollToBottom = () => {
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		smoothScrollToBottom(divRef);
	}, [divRef]);

	return divRef;
};
