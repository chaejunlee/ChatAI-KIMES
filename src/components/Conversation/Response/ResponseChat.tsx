import { Avatar, Stack } from "@mui/material";
import Logo from "../../../assets/logo.png";
import { useSmoothScrollToBottom } from "../../../utils/Chat";

export const ResponseChat = ({ children }: { children: React.ReactNode }) => {
	const divRef = useSmoothScrollToBottom();

	return (
		<Stack ref={divRef} width={"100%"} alignItems={"start"} gap={"6px"}>
			<Avatar
				imgProps={{ style: { objectFit: "contain" } }}
				alt={"ChatAI"}
				src={Logo}
			/>
			{children}
		</Stack>
	);
};
