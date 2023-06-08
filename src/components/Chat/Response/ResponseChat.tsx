import { Avatar, Stack } from "@mui/material";
import Logo from "../../../assets/logo.png";
import AnimationScope, {
	ANIMATION_TARGET,
} from "../../../utils/Message/AnimationScope";

export const CHAT_MAX_WIDTH = "80%";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	return (
		<AnimationScope>
			<Stack
				className={ANIMATION_TARGET}
				gap={"0.5rem"}
				direction={"row"}
				maxWidth={CHAT_MAX_WIDTH}
			>
				<Avatar
					imgProps={{ style: { objectFit: "contain" } }}
					alt={"ChatAI"}
					src={Logo}
					style={{ width: "2.2rem", height: "2.2rem" }}
				/>
				<Stack gap={"0.5rem"} width={"100%"} alignItems={"start"}>
					{children}
				</Stack>
			</Stack>
		</AnimationScope>
	);
};
