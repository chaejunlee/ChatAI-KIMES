import { Stack, styled } from "@mui/material";

import HeaderSVG from "../../assets/HeaderSVG";
import { SurveyButton } from "./SurveyButton";
import { Logo } from "./Logo";

// to the header
const StyledHeader = styled("div")`
	position: absolute;
	display: flex;
	top: 0;
	width: 100%;
	height: 5.25rem;
	justify-content: center;
	background: white;
	filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1));
	overflow-x: clip;
	z-index: 1;
`;

export default function Header() {
	return (
		<Stack
			width={"100%"}
			direction={"row"}
			position={"sticky"}
			top={"0"}
			left={"0"}
			right={"0"}
			zIndex={"10"}
			style={{ isolation: "isolate" }}
		>
			<StyledHeader>
				<HeaderSVG
					style={{
						height: "10rem",
						marginInline: "auto",
						flexShrink: 0,
						pointerEvents: "none",
					}}
				/>
			</StyledHeader>
			<Stack
				width="100%"
				direction={"row"}
				height={"3.25rem"}
				justifyContent={"space-between"}
				alignItems={"center"}
				p={"1rem"}
				sx={{
					"@media (min-width: 600px)": { paddingInline: "2rem" },
					isolation: "isolate",
				}}
				zIndex={2}
			>
				<SurveyButton />
				<Logo />
			</Stack>
		</Stack>
	);
}
