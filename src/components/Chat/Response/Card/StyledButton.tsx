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
	padding-block: clamp(6px, 0.5rem, 18px);
	padding-inline: clamp(8px, 0.8rem, 22px);

	background: ${Style("hsl(135 60% 75%)", "white")};
	color: ${Style("hsl(135 20% 20%)", "#6a6a6a")};
	text-align: start;
	font-weight: 500;
	font-size: 1rem;

	border-radius: 1.25rem;
	border: clamp(1px, 0.1rem, 10px) solid ${Style("#366344", "#cacfcf")};

	cursor: pointer;

	transition: background 0.2s linear;

	&:hover {
		background: ${Style("hsl(135 50% 60%)", "#f3f3f3")};
	}

	&:focus {
		background: ${Style("hsl(135 50% 60%)", "#f3f3f3")};
	}

	&:active {
		background: ${Style("hsl(135 50% 60%)", "#e1e1e1")};
	}
`;

export default memo(StyledButton);
