import { BasicMessage } from "../BasicMessage";
import { FC, ReactNode } from "react";

export const BasicRequestMessage: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<BasicMessage className="message" isResponse={false}>
			{children}
		</BasicMessage>
	);
};
