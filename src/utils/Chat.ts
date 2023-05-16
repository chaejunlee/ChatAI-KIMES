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

/**
 * 	링크는 답변 중 맨 마지막 Reference로 받아짐
 *	http(s):// 이거나 www. 으로 시작하는 링크가 있는지 확인
 */

// regex that check if the text contains url

export const containsUrl = (text: string) => {
	const urlRegex = new RegExp(
		"^(https?:\\/\\/)?" + // validate protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-z\\d_]*)?$", // validate fragment locator
		"gi"
	);
	return urlRegex.test(text);
};

/// const urls = ['www.google.com', 'http://www.google.com', 'google.com', 'https://google.com', 'hello. nice to meet you']
