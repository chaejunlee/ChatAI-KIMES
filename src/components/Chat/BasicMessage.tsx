import styled from "@emotion/styled";

export interface isResponseInterface {
	isResponse?: boolean;
}

export const Style =
	(trueProp: string, falseProp: string) => (props: isResponseInterface) => {
		return props.isResponse ? trueProp : falseProp;
	};

export const BasicMessage = styled("div")<isResponseInterface>`
	padding: 0.5rem 0.7rem;
	display: inline-block;

	background: ${Style("#f6f8f8", "#12c670")};
	border-radius: ${Style("0px 1rem 1rem 1rem", "1rem 0px 1rem 1rem")};
	align-items: ${Style("flex-start", "flex-end")};

	color: ${Style("black", "white")};
	border: none;
	box-shadow: none;

	word-break: break-all;
`;
