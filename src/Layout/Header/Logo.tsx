import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ChatAIDE from "../../assets/ChatAI-B.png";

const html = document.querySelector("html");

const sizeMetric = ["작게", "보통", "크게"];
const minSize = 12;
const maxSize = 36;
const pxToMetric = (px: number) => {
	if (px < 18) return 0;
	else if (px < 24) return 1;
	else return 2;
};

const sizeMarks = sizeMetric.map((metric, i) => ({
	value: minSize + (maxSize - minSize) * (i / (sizeMetric.length - 1)),
	label: metric,
}));

export const Logo = () => {
	const currentFontSize = Number(html?.style.fontSize.replace("px", "") || 16);

	const [open, setOpen] = useState(false);
	const [fontSize, setFontSize] = useState(currentFontSize);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<ButtonBase
				onClick={handleOpen}
				sx={{
					paddingBlock: "0.5rem",
					paddingInline: "0.5rem",
					borderRadius: "0.5rem",
					marginInline: "-0.5rem",
					marginBlock: "-0.5rem",
					maxWidth: "60%",
				}}
			>
				<img
					style={{
						display: "block",
						width: "10rem",
						height: "auto",
						maxWidth: "100%",
					}}
					src={ChatAIDE}
					alt="Chat AIDE"
				/>
			</ButtonBase>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
				sx={{
					"& .MuiModal-backdrop": {
						padding: "1rem",
					},
				}}
			>
				<Box
					sx={{
						position: "absolute",
						bgcolor: "background.paper",
						left: "clamp(20px, 2rem, 30px)",
						right: "clamp(20px, 2rem, 30px)",
						maxWidth: "clamp(200px, 20rem, 400px)",
						margin: "auto",
						border: "0px solid #000",
						borderRadius: "0.5rem",
						boxShadow: 24,
						p: "clamp(24px, 2rem, 30px)",
					}}
				>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						현재 폰트 크기
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{sizeMetric[pxToMetric(fontSize)]} - {fontSize}px
					</Typography>
					<Slider
						defaultValue={fontSize}
						aria-label="Default"
						valueLabelDisplay="auto"
						min={minSize}
						max={maxSize}
						marks={sizeMarks}
						step={4}
						value={fontSize}
						onChange={(e, value) => {
							setFontSize(value as number);
							if (html) html.style.fontSize = `${value}px`;
						}}
						sx={{
							width: "80%",
						}}
						style={{
							display: "block",
							marginInline: "auto",
							marginBlock: "1rem",
						}}
					/>
				</Box>
			</Modal>
		</>
	);
};
