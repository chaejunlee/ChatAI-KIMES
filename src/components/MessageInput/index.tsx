import React from "react";
import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
	onClick: (message: string) => void;
}

export default function MessageInput({ onClick }: MessageInputProps) {
	const [text, setText] = React.useState<string>("");

	return (
		<Paper>
			<TextField
				// TODO: enter 누를때 메시지 전송로직
				onChange={(v) => setText(v.target.value)}
				placeholder="Message..."
				label={""}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AddCircleIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={(e) => onClick(text)}>
								<SendIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</Paper>
	);
}

MessageInput.defaultProps = {
	onClick: (message: string) => {
		console.log(message);
	},
};
