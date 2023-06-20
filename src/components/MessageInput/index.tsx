import { styled, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { forwardRef, KeyboardEvent, memo, useEffect } from "react";
import {
	addKeyboardPopupListener,
	setFullHeight,
	setWithKeyboardHeight,
} from "../../utils/Mobile/keyboard";
import { SendComponent } from "./SendComponent";
import { HomeButton } from "./HomeButton";
import { useSendRequest } from "./useSendRequest";
import { useAppSelector } from "../../store/store";
import {
	hasMessageReachedBottom,
	isMessageStatusLoading,
} from "../../store/message/messageSlice";

const ENTER_KEY_HINT = "send";
const INPUT_TYPE = "search";

function MessageInput() {
	const isLoading = useAppSelector(isMessageStatusLoading);
	const didReachEnd = useAppSelector(hasMessageReachedBottom);

	const { inputRef, hiddenInputRef, sendRequest } = useSendRequest();

	const handleOnClick = () => {
		sendRequest();
	};

	const handleTextFieldKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.keyCode === 13) sendRequest();
	};

	useEffect(() => {
		if (didReachEnd) inputRef.current?.focus();
	}, [didReachEnd]);

	return (
		<>
			<TextFieldWrapper>
				<HomeButton />
				<TextField
					inputRef={inputRef}
					disabled={isLoading}
					placeholder={
						isLoading ? "요청을 답변 중입니다." : "궁금한 점을 입력하세요."
					}
					onKeyDown={(e) => handleTextFieldKey(e)}
					onFocus={() => {
						setWithKeyboardHeight();
						addKeyboardPopupListener();
					}}
					inputProps={{
						enterKeyHint: ENTER_KEY_HINT,
						type: INPUT_TYPE,
						style: { paddingBlock: "0.75rem" },
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
						backgroundColor: "#F0F3F4",
					}}
					variant={"standard"}
					autoComplete={"off"}
				/>
				<ResetButton onClick={setFullHeight}>키보드 내리기</ResetButton>
			</TextFieldWrapper>
			<InputFlush ref={hiddenInputRef} />
		</>
	);
}

const TextFieldWrapper = styled("div")`
	position: sticky;
	display: flex;
	left: 0rem;
	right: 0rem;
	bottom: 0rem;
	padding-block: 0.5rem;
	background: white;
	border-top: #eee 2px solid;
	padding-inline: 0.25rem;
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

const ResetButton = styled("div")`
	position: absolute;
	display: block;

	top: 6rem;
	left: 0;
	right: 0;
	margin-inline: auto;
	text-align: center;

	padding-inline: 1rem;
	padding-block: 0.5rem;
	width: 7rem;
	border-radius: 100vh;

	background: #eee;
	color: #333;
	font-weight: semi-bold;
	z-index: 100;
`;

export default memo(MessageInput);
