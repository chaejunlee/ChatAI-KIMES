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

export const StyledButton = styled(Button)<IsSelectedInterface>`
	padding-inline: 0.8rem;

	background: ${Style("#eaefef", "white")};
	color: ${Style(primaryColor, "black")};
	text-align: start;

	border-radius: 20px;
	border: 1px solid ${Style(primaryColor, "#bed1d1")};
	margin: 0 !important;
	min-width: 60px; !important;
`;
