import { Stack, styled } from "@mui/material";

import HeaderButton from "./HeaderButton";
import { Logo } from "./Logo";

const SURVEY_ACTION = "설문조사";

// to the header
const StyledHeader = styled("div")`
	position: sticky;
	display: flex;
	top: 0;
	flex-shrink: 0;
	width: 100%;
	justify-content: center;
	background: white;
	filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1));
	z-index: 1;
	backdrop-filter: blur(0px);
	transform: translateZ(0);
`;

const openLink = (url: string) => {
	window.open(url, "_blank");
};

export default function Header() {
	return (
		<>
			<StyledHeader>
				<Stack
					width="100%"
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
					paddingY={"clamp(18px, 1rem, 20px)"}
					paddingX={"clamp(18px, 1rem, 20px)"}
					sx={{
						isolation: "isolate",
					}}
					zIndex={2}
				>
					<Logo />
					<HeaderButton
						clickHandlerBuilder={(callback: () => void) => () => {
							// sendRequest(SURVEY_ACTION);
							openLink("https://forms.gle/DVH8sNSo94G8Rarj6");
							callback();
						}}
					>
						설문 시작
					</HeaderButton>
				</Stack>
			</StyledHeader>
		</>
	);
}
