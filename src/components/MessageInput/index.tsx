import React, { useEffect, useRef } from "react";
import {
	IconButton,
	InputAdornment,
	keyframes,
	styled,
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
			padding: "0.75rem 0.3rem",
		},
	},
});

export default function MessageInput({ onClick, loading }: MessageInputProps) {
	const [text, setText] = React.useState<string>("");
	const classes = useStyles();

	const ref = useRef<HTMLInputElement>(null);

	const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

	const RotatingRefreshIcon = styled(RefreshIcon)`
		animation: ${rotate} 1s linear infinite;
	`;

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
			sx={{
				width: "calc(100% - 2rem)",
				borderRadius: "200px",
				position: "absolute",
				bottom: "1.5rem",
				left: "50vw",
				transform: "translate(-50%, 0%)",
				boxSizing: "border-box",
			}}
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
					<InputAdornment sx={{ paddingLeft: "0.5rem" }} position="start">
						<AddCircleIcon fontSize="large" sx={{ color: "#32B6AE" }} />
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment sx={{ paddingRight: "0.5rem" }} position="end">
						<IconButton onClick={handleOnclick}>
							{loading ? <RotatingRefreshIcon /> : <SendIcon />}
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
