import HomeRounded from "@mui/icons-material/HomeRounded";
import IconButton from "@mui/material/IconButton";
import { pullInputDown } from "../../store/keyboard/keyboardSlice";
import {
	DEFAULT_MESSAGE,
	fetchResponse,
} from "../../store/message/fetchResponse";
import { useAppDispatch } from "../../store/store";
import { primaryColor } from "../../utils/color";

export const HomeButton = () => {
	const dispatch = useAppDispatch();

	return (
		<IconButton
			onClick={() => {
				dispatch(pullInputDown());
				dispatch(
					fetchResponse({ message: DEFAULT_MESSAGE, leaveMessage: false })
				);
			}}
			style={{
				display: "grid",
				background: primaryColor,
				borderRadius: "100vh",
				aspectRatio: "1 / 1",
				height: "100%",
				placeItems: "center",
				padding: 0,
				minWidth: 0,
			}}
		>
			<HomeRounded htmlColor={"white"} />
		</IconButton>
	);
};
