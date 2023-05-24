import { Avatar, Stack } from "@mui/material";
import Logo from "../../../assets/logo.png";
import AnimationScope from "../../../utils/Message/AnimationScope";
import { useSmoothScrollToBottom } from "../../../utils/chat";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	const divRef = useSmoothScrollToBottom();

	return (
		<AnimationScope>
			<Stack
				className="message"
				ref={divRef}
				gap={"8px"}
				direction={"row"}
				maxWidth={"80%"}
			>
				<Avatar
					imgProps={{ style: { objectFit: "contain" } }}
					alt={"ChatAI"}
					src={Logo}
				/>
				<Stack gap={"8px"} width={"100%"} alignItems={"start"}>
					{children}
				</Stack>
			</Stack>
		</AnimationScope>
	);
};
