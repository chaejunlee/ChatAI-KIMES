import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment } from "@mui/material";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { RotatingRefreshIcon } from "./RotatingRefreshIcon";

export const SendComponent = ({
	handleOnClick,
}: {
	handleOnClick: () => void;
}) => {
	const { status: isLoading } = useMessageStatus();

	return (
		<InputAdornment sx={{ paddingRight: "0.5rem" }} position={"end"}>
			<IconButton onClick={handleOnClick}>
				{isLoading ? <RotatingRefreshIcon /> : <SendIcon />}
			</IconButton>
		</InputAdornment>
	);
};
