import { ANIMATION_TARGET } from "../../../utils/Message/AnimationScope";
import { BasicMessage } from "../BasicMessage";
import { FC, ReactNode } from "react";

export const BasicResponseMessage: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<BasicMessage className={ANIMATION_TARGET} isResponse={true}>
			{children}
		</BasicMessage>
	);
};
