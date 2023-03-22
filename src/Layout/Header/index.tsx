import ReactDOM from "react-dom";
import MenuButton from "../../components/MenuButton";
import { Icon, IconButton, Stack, styled, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import BeamworksLogo from "../../assets/BeamworksLogo.png";

import UnionIcon from "../../assets/Union.png";
import { boxSizing } from "@mui/system";

// to the header
const StyledHeaderImg = styled("img")`
	position: absolute;
	top: 0;
	width: 520px;
	background-color: transparent;
	z-index: 1;
`;

export default function Header() {
	return ReactDOM.createPortal(
		<Stack width={"100%"} direction={"row"}>
			<Stack
				m={"1rem"}
				direction={"row"}
				width="100%"
				height={"50px"}
				justifyContent={"space-between"}
				zIndex={2}
			>
				<MenuButton />
				<IconButton disabled>
					<img
						style={{ width: "200px", height: "auto", zIndex: 2 }}
						src={BeamworksLogo}
						alt="Beamworks"
					/>
				</IconButton>
				<IconButton>
					<HelpOutlineIcon />
				</IconButton>
			</Stack>
			<StyledHeaderImg src={UnionIcon} alt="Union" />
			<Typography
				zIndex={1}
				color={"#32B6AE"}
				fontWeight={"bold"}
				fontSize={"1.5rem"}
				sx={{
					position: "absolute",
					top: "7.5%",
					left: "50%",
					transform: "translate(-50%, 50%)",
				}}
			>
				ChatAI
			</Typography>
		</Stack>,
		document.getElementById("root") as HTMLElement
	);
}
