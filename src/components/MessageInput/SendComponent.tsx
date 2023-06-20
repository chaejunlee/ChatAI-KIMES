import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment } from "@mui/material";
import { RotatingRefreshIcon } from "./RotatingRefreshIcon";
import { useAppSelector } from "../../store/store";
import { isMessageStatusLoading } from "../../store/message/messageSlice";

export const SendComponent = ({
	handleOnClick,
}: {
	handleOnClick: () => void;
}) => {
	const isLoading = useAppSelector(isMessageStatusLoading);

	return (
		<InputAdornment sx={{ paddingRight: "0.3rem" }} position={"end"}>
			<IconButton onClick={handleOnClick}>
				{isLoading ? <RotatingRefreshIcon /> : <SendIcon />}
			</IconButton>
		</InputAdornment>
	);
};
