import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";
import { BasicMessage } from "../BasicMessage";
import { FC, ReactNode } from "react";

export const BasicRequestMessage: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<BasicMessage className={ANIMATION_TARGET} isResponse={false}>
			{children}
		</BasicMessage>
	);
};
