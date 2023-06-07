import styled from "@emotion/styled";
import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

const AnimationScopeWrapper = styled("div")`
	position: relative;
	display: flex;
	width: 100%;
`;

export const ANIMATION_TARGET = "animation-target";
const ANIMATION_TARGET_SELECTOR = `.${ANIMATION_TARGET}`;

export default function AnimationScope({
	children,
	selector,
}: {
	children: React.ReactNode;
	selector?: string;
}) {
	const [scope, animate] = useAnimate();

	const animateSelector = selector ? selector : ANIMATION_TARGET_SELECTOR;

	useEffect(() => {
		if (scope)
			animate(
				animateSelector,
				{
					opacity: [0, 1],
					y: [10, 0],
				},
				{
					delay: stagger(0.1),
					duration: 0.3,
				}
			);
	}, []);

	return <AnimationScopeWrapper ref={scope}>{children}</AnimationScopeWrapper>;
}
