import { styled, css } from "@mui/system";

const BasicMessage = styled("div")`
	padding: 8px 16px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;

	background: #32b6ae;
	border-radius: 9.375em 0em 5em 9.375em;

	color: white;
`;

export default function Wrapper({
	children,
	...props
}: {
	children: any;
	props: any;
}) {
	return <BasicMessage {...props}>{children}</BasicMessage>;
}
