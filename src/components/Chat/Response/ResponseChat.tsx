import { Avatar, Stack } from "@mui/material";
import Logo from "../../../assets/logo.png";
import AnimationScope, {
	ANIMATION_TARGET,
} from "../../../utils/Message/AnimationScope";
import { useSmoothScrollToBottom } from "../../../utils/chat";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	const divRef = useSmoothScrollToBottom();

	return (
		<AnimationScope>
			<Stack
				className={ANIMATION_TARGET}
				ref={divRef}
				gap={"0.5rem"}
				direction={"row"}
				maxWidth={"80%"}
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
