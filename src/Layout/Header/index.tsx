import { Stack, styled } from "@mui/material";

import HeaderSVG from "../../assets/HeaderSVG";
import { fetchResponse } from "../../store/message/fetchResponse";
import { useAppDispatch } from "../../store/store";
import HeaderButton from "./HeaderButton";
import { Logo } from "./Logo";

const SURVEY_ACTION = "설문조사";

// to the header
const StyledHeader = styled("div")`
	position: sticky;
	display: flex;
	top: 0;
	width: 100%;
	height: 4rem;
	justify-content: center;
	background: white;
	filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1));
	z-index: 1;
`;

export default function Header() {
	const dispatch = useAppDispatch();

	const sendRequest = (value: string) => {
		dispatch(fetchResponse({ message: value, leaveMessage: false }));
	};

	return (
		<>
			<StyledHeader>
				<HeaderSVG
					style={{
						position: "absolute",
						height: "8rem",
						width: "100%",
						marginInline: "auto",
						flexShrink: 0,
						pointerEvents: "none",
						translate: "0 -0.2rem",
					}}
				/>
				<Stack
					width="100%"
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					p={"1rem"}
					sx={{
						"@media (min-width: 600px)": { paddingInline: "1.5rem" },
						isolation: "isolate",
					}}
					zIndex={2}
				>
					<HeaderButton
						clickHandlerBuilder={(callback: () => void) => () => {
							sendRequest(SURVEY_ACTION);
							callback();
						}}
					>
						설문조사 시작하기
					</HeaderButton>
					<Logo />
				</Stack>
			</StyledHeader>
		</>
	);
}
