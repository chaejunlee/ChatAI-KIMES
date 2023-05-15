import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

export default function MenuButton() {
	return (
		<IconButton sx={{ zIndex: 1 }}>
			<MenuIcon />
		</IconButton>
	);
}
