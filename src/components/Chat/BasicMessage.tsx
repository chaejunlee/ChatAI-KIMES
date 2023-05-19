import { styled } from "@mui/system";

export const BasicMessage = styled("div")((props: { isResponse: boolean }) => ({
	padding: "10px 14px",
	display: "inline-block",
	maxWidth: "70%",

	background: props.isResponse ? "#eaefef" : "#12c670",
	borderRadius: props.isResponse ? "0px 20px 20px 20px" : "20px 0px 20px 20px",

	color: props.isResponse ? "black" : "white",
	border: "none",
	boxShadow: "none",

	wordBreak: "keep-all",
}));
