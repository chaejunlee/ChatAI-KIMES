import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ReactNode, useState } from "react";
import { primaryColor } from "../../utils/color";

const StyledSpan = styled("span")`
	word-break: keep-all;
	font-size: 1rem;
	padding: clamp(9px, 0.5rem, 15px) clamp(18px, 1rem, 30px);
	font-size: 1rem;

	@media (max-width: 600px) {
		font-size: ;
		padding: clamp(4px, 0.25rem, 8px) clamp(8px, 0.5rem, 12px);
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
				color: isStarted ? "#3e3e3e" : primaryColor,
				background: isStarted ? "#bbbbbb" : "white",
				border: (isStarted ? "#2e2e2e" : primaryColor) + " 1px solid",
				fontWeight: "700",
				lineHeight: "1.2rem",
				minWidth: "0",
			}}
			onClick={handleButtonClick}
			disabled={isStarted}
		>
			<StyledSpan>{children}</StyledSpan>
		</Button>
	);
};

export default HeaderButton;
