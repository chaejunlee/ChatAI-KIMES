import { styled } from "@mui/system";
import { ReactNode } from "react";

const BasicMessage = styled("div")`
	padding: 8px 16px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;
	max-width: 80%;

	background: #12c670;
	border-radius: 20px 0px 20px 20px;

	color: white;
`;

export default function Wrapper({ children }: { children: ReactNode }) {
	return <BasicMessage>{children}</BasicMessage>;
}
