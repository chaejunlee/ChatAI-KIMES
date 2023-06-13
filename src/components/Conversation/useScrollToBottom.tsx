import { RefObject, useEffect, useRef } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { hasMessageReachedBottom } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";

export const useScrollToBottom = () => {
	const stackRef = useRef<HTMLDivElement>(null);
	const { status: isLoading } = useMessageStatus();
	const isBottom = useAppSelector(hasMessageReachedBottom);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (isLoading) scrollToBottom(stackRef);
		});
	}, [isLoading]);

	useEffect(() => {
		requestAnimationFrame(() => {
			if (isBottom) scrollToBottom(stackRef);
		});
	}, [isBottom]);

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
