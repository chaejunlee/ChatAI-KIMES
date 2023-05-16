import AddCircleIcon from "@mui/icons-material/AddCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import SendIcon from "@mui/icons-material/Send";
import {
	IconButton,
	InputAdornment,
	keyframes,
	styled,
	TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { addMessage } from "../../store/message/messageSlice";
import { fetchResponse } from "../../store/message/fetchResponse";
import { useAppDispatch } from "../../store/store";
import { primaryColor } from "../../utils/color";
import { addKeyboardPopupListener } from "../../utils/Mobile/keyboard";
import { RotatingRefreshIcon } from "./RotatingRefreshIcon";

const useStyles = makeStyles({
	root: {
		backgroundColor: "#F0F3F4",
		"& .MuiInputBase-input": {
			padding: "0.75rem 0.3rem",
		},
	},
});

const TextFiledWrapper = styled("div")`
	position: sticky;
	left: 0rem;
	right: 0rem;
	bottom: 0rem;
	padding-block: 0.5rem;
	background: white;
	border-top: #eee 2px solid;
	padding-inline: 0.5rem;
`;

const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

const RotatingRefreshIcon = styled(RefreshIcon)`
	animation: ${rotate} 1s linear infinite;
`;

export default function MessageInput() {
	const { status: isLoading } = useMessageStatus();
	const dispatch = useAppDispatch();

	const onClick = (message: string) => {
		dispatch(addMessage(message));
		dispatch(fetchResponse(message));
	};

	const [text, setText] = React.useState<string>("");
	const classes = useStyles();

	const ref = useRef<HTMLInputElement>(null);

	const handleOnClick = () => {
		if (isLoading) return;
		if (text.length === 0) return;
		onClick(text);
		setText("");
		ref.current?.focus();
	};

	const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
		if (isLoading) return;
		if (e.key === "Enter" && e.keyCode === 13) {
			handleOnClick();
		}
	};

	return (
		<TextFiledWrapper>
			<TextField
				sx={{
					width: "100%",
					borderRadius: "200px",
					boxSizing: "border-box",
				}}
				variant={"standard"}
				onKeyDown={handleTextFieldKeyDown}
				inputRef={ref}
				value={text}
				autoComplete={"off"}
				onChange={(v) => setText(v.target.value)}
				onFocus={() => {
					addKeyboardPopupListener();
				}}
				placeholder={
					isLoading ? "요청을 답변 중입니다." : "메시지를 입력하세요."
				}
				classes={{
					root: classes.root,
				}}
				disabled={isLoading}
				InputProps={{
					disableUnderline: true,
					startAdornment: <PlusComponent />,
					endAdornment: <SendComponent handleOnClick={handleOnClick} />,
				}}
			/>
		</TextFiledWrapper>
	);
}

const PlusComponent = () => {
	return (
		<InputAdornment sx={{ paddingLeft: "0.5rem" }} position={"start"}>
			<AddCircleIcon fontSize={"large"} sx={{ color: primaryColor }} />
		</InputAdornment>
	);
};

const SendComponent = ({ handleOnClick }: { handleOnClick: () => void }) => {
	const { status: isLoading } = useMessageStatus();

	return (
		<InputAdornment sx={{ paddingRight: "0.5rem" }} position={"end"}>
			<IconButton onClick={handleOnClick}>
				{isLoading ? <RotatingRefreshIcon /> : <SendIcon />}
			</IconButton>
		</InputAdornment>
	);
};

MessageInput.defaultProps = {
	onClick: (message: string) => {
		console.log(message);
	},
};
