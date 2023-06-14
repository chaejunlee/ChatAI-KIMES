import { styled, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { forwardRef, KeyboardEvent, memo } from "react";
import { addKeyboardPopupListener } from "../../utils/Mobile/keyboard";
import { SendComponent } from "./SendComponent";
import { HomeButton } from "./HomeButton";
import { useSendRequest } from "./useSendRequest";
import { useAppSelector } from "../../store/store";
import { isMessageStatusLoading } from "../../store/message/messageSlice";

const useStyles = makeStyles({
	root: {
		backgroundColor: "#F0F3F4",
		"& .MuiInputBase-input": {
			padding: "0.75rem 0.3rem",
		},
	},
});

const ENTER_KEY_HINT = "send";
const INPUT_TYPE = "search";

function MessageInput() {
	const isLoading = useAppSelector(isMessageStatusLoading);
	const classes = useStyles();

	const { inputRef, hiddenInputRef, sendRequest } = useSendRequest();

	const handleOnClick = () => {
		sendRequest();
	};

	const handleTextFieldKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.keyCode === 13) sendRequest();
	};

	return (
		<>
			<TextFiledWrapper className="message-input">
				<HomeButton />
				<TextField
					inputRef={inputRef}
					disabled={isLoading}
					placeholder={
						isLoading ? "요청을 답변 중입니다." : "궁금한 점을 입력하세요."
					}
					onKeyDown={(e) => handleTextFieldKey(e)}
					onFocus={() => {
						addKeyboardPopupListener();
					}}
					inputProps={{
						enterKeyHint: ENTER_KEY_HINT,
						type: INPUT_TYPE,
						style: { paddingBlock: "0.5rem" },
					}}
					InputProps={{
						disableUnderline: true,
						endAdornment: <SendComponent handleOnClick={handleOnClick} />,
					}}
					sx={{
						display: "flex",
						borderRadius: "200px",
						boxSizing: "border-box",
						flexGrow: 1,
						paddingLeft: "1rem",
					}}
					variant={"standard"}
					autoComplete={"off"}
					classes={{
						root: classes.root,
					}}
				/>
			</TextFiledWrapper>
			<InputFlush ref={hiddenInputRef} />
		</>
	);
}

const TextFiledWrapper = styled("div")`
	position: sticky;
	display: flex;
	left: 0rem;
	right: 0rem;
	bottom: 0rem;
	padding-block: 0.5rem;
	background: white;
	border-top: #eee 2px solid;
	padding-inline: 0.75rem;
	gap: 0.5rem;
	align-items: center;
`;

const InputFlush = forwardRef<HTMLInputElement, unknown>((_, ref) => {
	return (
		<input
			ref={ref}
			className="hidden-input"
			style={{
				overflow: "hidden",
				position: "absolute",
				top: "-50%",
				width: 10,
				height: 10,
				zIndex: -1000,
			}}
			type={INPUT_TYPE}
			enterKeyHint={ENTER_KEY_HINT}
			tabIndex={-1}
		/>
	);
});

export default memo(MessageInput);
