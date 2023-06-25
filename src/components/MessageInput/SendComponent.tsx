import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { isMessageStatusLoading } from "../../store/message/messageSlice";
import { useAppSelector } from "../../store/store";
import { RotatingRefreshIcon } from "./RotatingRefreshIcon";

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
