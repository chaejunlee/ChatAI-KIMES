import React, { useEffect, useRef } from "react";
import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import { makeStyles } from "@mui/styles";

interface MessageInputProps {
	onClick: (message: string) => void;
	loading: boolean;
}
const useStyles = makeStyles({
	root: {
		"& .MuiInputBase-root": {
			border: "none",
		},
	},
});

export default function MessageInput({ onClick, loading }: MessageInputProps) {
	const [text, setText] = React.useState<string>("");
	const classes = useStyles();

	const ref = useRef<HTMLInputElement>(null);

	const handleOnclick = () => {
		if (text.length === 0) return;
		onClick(text);
		setText("");
		ref.current?.focus();
	};

	const handleTextFieldKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleOnclick();
		}
	};

	useEffect(() => {
		ref.current?.focus();
	}, []);

	return (
		<>
			<TextField
				onKeyDown={handleTextFieldKeyDown}
				// disabled={loading}
				inputRef={ref}
				value={text}
				autoComplete="off"
				classes={{
					root: classes.root,
				}}
				// TODO: enter 누를때 메시지 전송로직 & input clear
				onChange={(v) => {
					setText(v.target.value);
					console.log(v.target.value);
				}}
				placeholder="Message..."
				label={""}
				InputProps={{
					disableUnderline: true,
					startAdornment: (
						<InputAdornment position="start">
							<AddCircleIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={handleOnclick}>
								{loading ? <RefreshIcon /> : <SendIcon />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</>
	);
}

MessageInput.defaultProps = {
	onClick: (message: string) => {
		console.log(message);
	},
};
