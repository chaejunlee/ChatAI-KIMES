import { styled, css } from "@mui/system";

const BasicMessage = styled("div")`
	border-radius: 20px;
	padding: 8px 15px;
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;

	background: #32b6ae;
	border-radius: 150px 0px 80px 150px;

	color: white;

	/* ${(props: any) =>
		props.primary &&
		css`
			color: white;
			background: navy;
			border-color: navy;
		`} */
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
