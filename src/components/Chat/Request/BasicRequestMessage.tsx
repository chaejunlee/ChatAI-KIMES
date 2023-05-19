import { BasicMessage } from "../BasicMessage";
import { FC, ReactNode } from "react";

export const BasicRequestMessage: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return <BasicMessage isResponse={false}>{children}</BasicMessage>;
};
