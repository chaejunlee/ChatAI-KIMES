import MenuButton from "../../components/MenuButton";
import { IconButton, Stack, styled } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import BeamworksLogo from "../../assets/BeamworksLogo.png";
import ChatAIDE from "../../assets/Chat-AIDE.png";

import HeaderSVG from "../../assets/HeaderSVG";

// to the header
const StyledHeader = styled("div")`
	position: absolute;
	display: flex;
	top: 0;
	width: 100%;
	height: 5.3rem;
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
			left="0"
			right="0"
			zIndex="10"
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
				m={"1rem"}
				direction={"row"}
				width="100%"
				justifyContent={"space-between"}
				alignItems={"center"}
				zIndex={2}
			>
				<MenuButton />
				<IconButton disabled>
					<img
						style={{
							display: "block",
							width: "12rem",
							height: "auto",
							zIndex: 2,
						}}
						src={BeamworksLogo}
						alt="Beamworks"
					/>
				</IconButton>
				<IconButton>
					<HelpOutlineIcon />
				</IconButton>
			</Stack>
			<img
				style={{
					position: "absolute",
					top: "4.75rem",
					left: "calc(50% + 0.5rem)",
					right: 0,
					width: "8rem",
					height: "auto",
					zIndex: 2,
					transform: "translate(-50%, -50%)",
				}}
				src={ChatAIDE}
				alt="Beamworks"
			/>
		</Stack>
	);
}
