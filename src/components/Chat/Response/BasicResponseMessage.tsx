import { BasicMessage } from "../BasicMessage";
import { FC, ReactNode } from "react";

export const BasicResponseMessage: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<BasicMessage className="message" isResponse={true}>
			{children}
		</BasicMessage>
	);
};
