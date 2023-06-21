import { Avatar, Stack } from "@mui/material";
import Logo from "../../../assets/logo.png";
import AnimationScope from "../../../utils/Message/AnimationScope";
import { memo } from "react";

export const CHAT_MAX_WIDTH = "90%";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	return (
		<AnimationScope>
			<Stack
				gap={"0.5rem"}
				maxWidth={CHAT_MAX_WIDTH}
				sx={{
					flexDirection: "row",
					"@media (max-width: 600px)": {
						flexDirection: "column",
					},
				}}
			>
				<MemoizedAvatar />
				<Stack gap={"0.5rem"} width={"100%"} alignItems={"start"}>
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
