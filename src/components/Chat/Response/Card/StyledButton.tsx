import styled from "@emotion/styled";
import { primaryColor } from "../../../../utils/color";
import { memo } from "react";

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
	padding-block: 0.5rem;
	padding-inline: 0.8rem;

	background: ${Style("white", "white")};
	color: ${Style(primaryColor, "#6a6a6a")};
	text-align: start;
	font-weight: ${Style("bold", "medium")};
	font-size: 1rem;

	border-radius: 1.25rem;
	border: ${Style("3px", "1px")} solid ${Style(primaryColor, "#bed1d1")};
	margin: ${Style("-2px", "0px")};

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

export default memo(StyledButton);
