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
				<HomeComponent />
				<TextField
					sx={{
						display: "flex",
						borderRadius: "200px",
						boxSizing: "border-box",
						flexGrow: 1,
						paddingLeft: "1rem",
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
