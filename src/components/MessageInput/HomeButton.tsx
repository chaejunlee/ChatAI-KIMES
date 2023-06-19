import { HomeRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
	DEFAULT_MESSAGE,
	fetchResponse,
} from "../../store/message/fetchResponse";
import { useAppDispatch } from "../../store/store";
import { primaryColor } from "../../utils/color";
import { setFullHeight } from "../../utils/Mobile/keyboard";

export const HomeButton = () => {
	const dispatch = useAppDispatch();

	return (
		<IconButton
			onClick={() => {
				setFullHeight();
				dispatch(
					fetchResponse({ message: DEFAULT_MESSAGE, leaveMessage: false })
				);
			}}
			style={{
				display: "grid",
				background: primaryColor,
				borderRadius: "100vh",
				aspectRatio: "1 / 1",
				height: "2.5rem",
				placeItems: "center",
				padding: 0,
				minWidth: 0,
			}}
		>
			<HomeRounded htmlColor={"white"} />
		</IconButton>
	);
};
