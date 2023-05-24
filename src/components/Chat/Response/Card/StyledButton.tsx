import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { primaryColor } from "../../../../utils/color";

export interface IsSelectedInterface {
	disabled: boolean;
}

export const Style =
	(trueProp: string, falseProp: string) => (props: IsSelectedInterface) => {
		return props.disabled ? trueProp : falseProp;
	};

export const StyledButton = styled("button")<IsSelectedInterface>`
	display: flex;
	justify-content: center;

	min-width: 50px; !important;

	margin: 0 !important;
	padding-block: 8px;
	padding-inline: 14px;

	background: ${Style("white", "white")};
	color: ${Style(primaryColor, "#6a6a6a")};
	text-align: start;
	font-weight: ${Style("bold", "medium")};
	font-size: 1rem;

	border-radius: 20px;
	border: 0;
	outline: ${Style("2px", "1px")} solid ${Style(primaryColor, "#bed1d1")};

	cursor: pointer;

	transition: all 0.2s ease-in-out;

	&:hover {
		background: ${Style("#f3f3f3", "#f3f3f3")};
	}

	&:focus {
		background: ${Style("#f3f3f3", "#f3f3f3")};
	}

	&:active {
		background: ${Style("#e1e1e1", "#e1e1e1")};
	}
`;
