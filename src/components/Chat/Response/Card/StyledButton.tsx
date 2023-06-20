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
	position: relative;
	display: flex;
	justify-content: center;

	min-width: 50px; !important;

	margin: 0 !important;
	padding-block: calc(0.6rem - ${Style("2px", "1px")});
	padding-inline: calc(0.9rem - ${Style("2px", "1px")});

	background: ${Style(primaryColor, "white")};
	color: ${Style("white", "#6a6a6a")};
	text-align: start;
	font-weight: ${Style("700", "500")};
	font-size: 1rem;

	border-radius: 1.25rem;
	border: ${Style("2px", "1px")} solid ${Style("#366344", "#cacfcf")};

	cursor: pointer;

	transition: background 0.2s linear;

	&:hover {
		background: ${Style(primaryColor, "#f3f3f3")};
	}

	&:focus {
		background: ${Style(primaryColor, "#f3f3f3")};
	}

	&:active {
		background: ${Style(primaryColor, "#e1e1e1")};
	}
`;

export default memo(StyledButton);
