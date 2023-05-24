import styled from "@emotion/styled";
import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

const AnimationScopeWrapper = styled("div")`
	position: relative;
	display: flex;
	width: 100%;
`;

export default function AnimationScope({
	children,
}: {
	children: React.ReactNode;
}) {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (scope)
			animate(
				".message",
				{
					opacity: [0, 1],
					y: [10, 0],
				},
				{
					delay: stagger(0.1, { startDelay: 0.1 }),
				}
			);
	}, []);

	return <AnimationScopeWrapper ref={scope}>{children}</AnimationScopeWrapper>;
}
