import React, { useEffect, useRef } from "react";
import {
	Box,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
} from "@mui/material";
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
		backgroundColor: "#F0F3F4",
		"& .MuiInputBase-input": {
			padding: "10px",
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
		if (e.key === "Enter" && e.keyCode === 13) {
			handleOnclick();
		}
	};

	useEffect(() => {
		ref.current?.focus();
	}, []);

	return (
		<TextField
			sx={{ width: "100%", borderRadius: "200px" }}
			variant="standard"
			onKeyDown={handleTextFieldKeyDown}
			inputRef={ref}
			value={text}
			autoComplete="off"
			onChange={(v) => setText(v.target.value)}
			placeholder="Message..."
			classes={{
				root: classes.root,
			}}
			InputProps={{
				disableUnderline: true,
				startAdornment: (
					<InputAdornment sx={{ paddingLeft: "1rem" }} position="start">
						<AddCircleIcon />
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment sx={{ paddingRight: "0.5rem" }} position="end">
						<IconButton onClick={handleOnclick}>
							{loading ? <RefreshIcon /> : <SendIcon />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}

MessageInput.defaultProps = {
	onClick: (message: string) => {
		console.log(message);
	},
};
