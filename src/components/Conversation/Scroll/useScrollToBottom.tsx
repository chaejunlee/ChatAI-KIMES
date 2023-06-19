import { RefObject, useEffect, useRef } from "react";
import {
	hasMessageReachedBottom,
	isMessageStatusLoading,
} from "../../../store/message/messageSlice";
import { useAppSelector } from "../../../store/store";

export const useScrollToBottom = () => {
	const stackRef = useRef<HTMLDivElement>(null);
	const isBottom = useAppSelector(hasMessageReachedBottom);
	const isLoading = useAppSelector(isMessageStatusLoading);

	useEffect(() => {
		if (!isLoading && !isBottom) return;
		requestAnimationFrame(() => {
			if (isLoading || isBottom) scrollToBottom(stackRef);
		});
	}, [isLoading, isBottom]);

	const scrollToBottom = (stackRef: RefObject<HTMLDivElement>) => {
		if (stackRef.current) {
			stackRef.current.scrollTo({
				top: stackRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	};

	return { stackRef };
};
