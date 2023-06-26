import styled from "@mui/material/styles/styled";
import TextField from "@mui/material/TextField";
import { forwardRef, KeyboardEvent, memo, useEffect } from "react";
import { addKeyboardPopupListener } from "../../store/keyboard/keyboardEventHandler";
import { pushInputUp } from "../../store/keyboard/keyboardSlice";
import {
	hasMessageReachedBottom,
	isMessageStatusLoading,
} from "../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { HomeButton } from "./HomeButton";
import { SendComponent } from "./SendComponent";
import { useSendRequest } from "./useSendRequest";

const ENTER_KEY_HINT = "send";
const INPUT_TYPE = "search";

function MessageInput() {
	const isLoading = useAppSelector(isMessageStatusLoading);
	const didReachEnd = useAppSelector(hasMessageReachedBottom);
	const dispatch = useAppDispatch();

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
						dispatch(addKeyboardPopupListener());
						dispatch(pushInputUp);
					}}
					inputProps={{
						enterKeyHint: ENTER_KEY_HINT,
						type: INPUT_TYPE,
						style: { paddingBlock: "clamp(8px, 0.6rem, 14px)" },
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
						paddingLeft: "clamp(12px, 1rem, 26px)",
						backgroundColor: "#F0F3F4",
					}}
					variant={"standard"}
					autoComplete={"off"}
				/>
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
	padding-inline: 0.5rem;
	overflow: visible;
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
