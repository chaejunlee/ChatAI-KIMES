import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { memo } from "react";
import Logo from "../../../assets/logo.png";
import AnimationScope from "../../../utils/Message/AnimationScope";

export const CHAT_MAX_WIDTH = "90%";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	return (
		<AnimationScope>
			<Stack
				gap={"clamp(8px, 0.5rem, 16px)"}
				maxWidth={CHAT_MAX_WIDTH}
				sx={{
					flexDirection: "row",
					"@media (max-width: 600px)": {
						flexDirection: "column",
					},
				}}
			>
				<MemoizedAvatar />
				<Stack
					gap={"clamp(12px, 0.5rem, 16px)"}
					width={"100%"}
					alignItems={"start"}
				>
					{children}
				</Stack>
			</Stack>
		</AnimationScope>
	);
};

const MemoizedAvatar = memo(() => (
	<Avatar
		imgProps={{ style: { objectFit: "contain" } }}
		alt={"ChatAI"}
		src={Logo}
		style={{ width: "2.2rem", height: "2.2rem" }}
	/>
));

export default memo(ResponseChat);
