import { BasicMessage } from "../BasicMessage";
import { FC, ReactNode } from "react";

export const BasicResponseMessage: FC<{ children: ReactNode }> = ({
	children,
}) => {
	return <BasicMessage isResponse={true}>{children}</BasicMessage>;
};
