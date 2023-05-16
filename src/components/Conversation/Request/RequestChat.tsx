import { Stack } from "@mui/material";
import RequestMessageType from "../../../Interface/Message/RequestMessageType";
import { useSmoothScrollToBottom } from "../../../utils/chat";
import RequestMessage from "../../Messages/Request/RequestMessage";

export function RequestChat({ message }: { message: RequestMessageType }) {
	const divRef = useSmoothScrollToBottom();

	return (
		<Stack ref={divRef} width={"100%"} alignItems={"end"}>
			<RequestMessage message={message} />
		</Stack>
	);
}
