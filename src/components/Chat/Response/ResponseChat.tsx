import { Avatar, Stack } from "@mui/material";
import Logo from "../../../assets/logo.png";
import AnimationScope from "../../../utils/Message/useMessageAnimation";
import { useSmoothScrollToBottom } from "../../../utils/chat";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	const divRef = useSmoothScrollToBottom();

	return (
		<AnimationScope>
			<Stack
				className="message"
				ref={divRef}
				width={"100%"}
				alignItems={"start"}
				gap={"10px"}
			>
				<Avatar
					imgProps={{ style: { objectFit: "contain" } }}
					alt={"ChatAI"}
					src={Logo}
				/>
				{children}
			</Stack>
		</AnimationScope>
	);
};
