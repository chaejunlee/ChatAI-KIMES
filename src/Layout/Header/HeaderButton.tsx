import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ReactNode, useState } from "react";
import { primaryColor } from "../../utils/color";

const StyledSpan = styled("span")`
	word-break: keep-all;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	font-size: 1rem;

	@media (max-width: 600px) {
		word-break: keep-all;
		width: min-content;
		font-size: 0.9rem;
		padding: 0.2rem 0.5rem;
	}
`;

const HeaderButton = ({
	children = "버튼",
	clickHandlerBuilder,
}: {
	children: ReactNode;
	clickHandlerBuilder: (callback: () => void) => () => void;
}) => {
	const [isStarted, setIsStarted] = useState(false);

	const handleButtonClick = clickHandlerBuilder(() => setIsStarted(true));

	return (
		<Button
			color="primary"
			style={{
				padding: 0,
				color: isStarted ? "#3e3e3e" : "white",
				background: isStarted ? "#bbbbbb" : primaryColor,
				fontWeight: "700",
				lineHeight: "1.2rem",
				minWidth: "0",
			}}
			onClick={handleButtonClick}
			variant="contained"
			disabled={isStarted}
		>
			<StyledSpan>{children}</StyledSpan>
		</Button>
	);
};

export default HeaderButton;
