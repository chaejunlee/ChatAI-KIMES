import React from "react";
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
`;

export default function Header() {
	return (
		<Stack width={"100%"} direction={"row"}>
			<Stack
				m={"1rem"}
				direction={"row"}
				width="100%"
				height={"50px"}
				justifyContent={"space-between"}
				zIndex={1}
			>
				<MenuButton />
				<IconButton disabled sx={{ zIndex: 1 }}>
					<img
						style={{ width: "200px", height: "auto", zIndex: 1 }}
						src={BeamworksLogo}
						alt="Beamworks"
					/>
				</IconButton>
				<IconButton sx={{ zIndex: 1 }}>
					<HelpOutlineIcon />
				</IconButton>
			</Stack>
			<StyledHeaderImg src={UnionIcon} alt="Union" />
			<Typography
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
		</Stack>
	);
}
