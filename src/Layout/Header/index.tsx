import ReactDOM from "react-dom";
import MenuButton from "../../components/MenuButton";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import BeamworksLogo from "../../assets/BeamworksLogo.png";

import HeaderSVG from "../../assets/HeaderSVG";

// to the header
const StyledHeader = styled("div")`
	position: absolute;
	display: flex;
	top: 0;
	width: 100%;
	height: 5.8rem;
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
						height: "11rem",
						marginInline: "auto",
						flexShrink: 0,
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
						style={{ width: "12.5rem", height: "auto", zIndex: 2 }}
						src={BeamworksLogo}
						alt="Beamworks"
					/>
				</IconButton>
				<IconButton>
					<HelpOutlineIcon />
				</IconButton>
			</Stack>

			<Typography
				zIndex={1}
				color={"#32B6AE"}
				fontWeight={"bold"}
				fontSize={"1.5rem"}
				sx={{
					position: "absolute",
					top: "3.5rem",
					left: "50%",
					transform: "translate(-50%, 50%)",
				}}
			>
				ChatAI
			</Typography>
		</Stack>
	);
}
