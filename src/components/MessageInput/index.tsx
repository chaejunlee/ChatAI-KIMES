import { HomeRounded } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { KeyboardEvent, memo, useRef } from "react";
import useMessageStatus from "../../hooks/Request/useMessageStatus";
import {
	DEFAULT_MESSAGE,
	fetchResponse,
} from "../../store/message/fetchResponse";
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
	display: flex;
	left: 0rem;
	right: 0rem;
	bottom: 0rem;
	padding-block: 0.75rem;
	background: white;
	border-top: #eee 2px solid;
	padding-inline: 0.75rem;
	gap: 0.5rem;
	align-items: center;
`;

function MessageInput() {
	const { status: isLoading } = useMessageStatus();
	const dispatch = useAppDispatch();
	const classes = useStyles();

	const inputRef = useRef<HTMLInputElement>(null);
	// for mobile keyboard popup
	const hiddenInputRef = useRef<HTMLInputElement>(null);

	const sendRequest = async (message: string) => {
		if (inputRef.current) inputRef.current.value = "";

		hiddenInputRef.current?.focus({ preventScroll: true });

		await dispatch(fetchResponse({ message, leaveMessage: true })).unwrap();

		inputRef.current?.focus({ preventScroll: true });
	};

	const canSend = () => {
		if (isLoading) return false;
		if (!inputRef || !inputRef.current) return false;

		const text = inputRef.current.value;
		if (text.length === 0) return false;

		return true;
	};

	const handleOnClick = () => {
		if (!canSend()) return;

		sendRequest(inputRef.current?.value!);
	};

	const handleTextFieldKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!canSend()) return;

		if (e.key === "Enter" || e.keyCode === 13) {
			sendRequest(inputRef.current?.value!);
		}
	};

	return (
		<>
			<TextFiledWrapper>
				<HomeComponent />
				<TextField
					inputProps={{ enterKeyHint: "send" }}
					sx={{
						display: "flex",
						borderRadius: "200px",
						boxSizing: "border-box",
						flexGrow: 1,
						paddingLeft: "1rem",
					}}
					variant={"standard"}
					type="search"
					onKeyDown={(e) => handleTextFieldKey(e)}
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
					width: 10,
					height: 10,
					zIndex: -1000,
				}}
				type="search"
				enterKeyHint="send"
				tabIndex={-1}
			></input>
		</>
	);
}

const HomeComponent = () => {
	const dispatch = useAppDispatch();

	return (
		<IconButton
			onClick={() => {
				dispatch(
					fetchResponse({ message: DEFAULT_MESSAGE, leaveMessage: false })
				);
			}}
			style={{
				display: "grid",
				background: primaryColor,
				borderRadius: "100vh",
				aspectRatio: "1 / 1",
				height: "3rem",
				placeItems: "center",
				minWidth: 0,
			}}
		>
			<HomeRounded htmlColor={"white"} />
		</IconButton>
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
