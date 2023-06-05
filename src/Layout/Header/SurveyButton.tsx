import { Button } from "@mui/material";
import { primaryColor } from "../../utils/color";
import { useAppDispatch } from "../../store/store";
import { fetchResponse } from "../../store/message/fetchResponse";
import { useState } from "react";
import styled from "@emotion/styled";

const StyledSpan = styled("span")`
	word-break: keep-all;
	font-size: 0.75rem;
	padding: 0.5rem 1rem;
	font-size: 1rem;

	@media (max-width: 600px) {
		word-break: keep-all;
		width: min-content;
		font-size: 0.75rem;
		padding: 0.2rem 0.5rem;
	}
`;

export const SurveyButton = () => {
	const dispatch = useAppDispatch();
	const [isStarted, setIsStarted] = useState(false);

	const sendRequest = (value: string) => {
		dispatch(fetchResponse({ message: value, leaveMessage: false }));
	};

	const handleButtonClick = () => {
		sendRequest("설문조사");
		setIsStarted(true);
	};
	return (
		<Button
			color="primary"
			style={{
				padding: 0,
				border: (isStarted ? "#212121" : primaryColor) + " 1px solid",
				color: isStarted ? "#3e3e3e" : "#1f7a4e",
				background: isStarted ? "#bbbbbb" : "#d0fbe6",
				fontWeight: "700",
				lineHeight: "1.2rem",
				minWidth: "0",
			}}
			onClick={handleButtonClick}
			variant="contained"
			disabled={isStarted}
		>
			<StyledSpan>설문조사 시작하기</StyledSpan>
		</Button>
	);
};
