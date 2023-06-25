import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

export default function MenuButton() {
	return (
		<IconButton sx={{ zIndex: 1 }}>
			<MenuIcon />
		</IconButton>
	);
}
