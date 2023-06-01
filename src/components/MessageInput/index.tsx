import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { KeyboardEvent, memo, useRef } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import { fetchResponse } from "../../store/message/fetchResponse";
import { useAppDispatch } from "../../store/store";
import { primaryColor } from "../../utils/color";
import { addKeyboardPopupListener } from "../../utils/Mobile/keyboard";
import { RotatingRefreshIcon } from "./RotatingRefreshIcon";
import { addMessage } from "../../store/message/messageSlice";

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

function MessageInput() {
	const { status: isLoading } = useMessageStatus();
	const dispatch = useAppDispatch();
	const classes = useStyles();

	// for mobile keyboard popup
	const hiddenInputRef = useRef<HTMLInputElement>(null);

	const sendRequest = async (message: string) => {
		if (inputRef.current) inputRef.current.value = "";
		await dispatch(fetchResponse({ message, leaveMessage: true })).unwrap();
		inputRef.current?.focus({ preventScroll: true });
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const flushInput = () => {
		if (!inputRef?.current || !hiddenInputRef?.current) return;
		hiddenInputRef.current.focus({ preventScroll: true });
		inputRef.current.focus({ preventScroll: true });
	};

	const handleOnClick = () => {
		if (isLoading) return;
		if (!inputRef || !inputRef.current) return;

		const text = inputRef.current.value;
		if (text.length === 0) return;

		flushInput();

		sendRequest(text);
	};

	const handleTextFieldKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
		if (isLoading) return;
		if (e.key === "Enter" || e.keyCode === 13) {
			handleOnClick();
		}
	};

	return (
		<>
			<TextFiledWrapper>
				<TextField
					sx={{
						width: "100%",
						borderRadius: "200px",
						boxSizing: "border-box",
					}}
					variant={"standard"}
					onKeyPress={(e) => handleTextFieldKeyPress(e)}
					inputRef={inputRef}
					autoComplete={"off"}
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
			<input
				ref={hiddenInputRef}
				className="hidden-input"
				style={{
					overflow: "hidden",
					position: "absolute",
					top: "-50%",
					width: 0,
					height: 0,
					zIndex: -1000,
				}}
			></input>
		</>
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

export default memo(MessageInput);
