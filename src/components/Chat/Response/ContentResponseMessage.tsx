import Typography from "@mui/material/Typography";
import { memo, useMemo } from "react";
import { ContentResponseMessageType } from "../../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../../utils/chat";
import { BasicResponseMessage } from "./BasicResponseMessage";
import { ResponseLink } from "./ResponseLink";

function ContentResponseMessage({
	message,
}: {
	message: ContentResponseMessageType;
}) {
	if (containsUrl(message.content))
		return <ResponseLink messageContent={message.content} />;

	const multiLineMessage = useMemo(
		() => message.content.split(/\\n|\n/g),
		[message.content]
	);

	return (
		<BasicResponseMessage>
			{multiLineMessage.map((paragraph, idx) => (
				<Typography key={paragraph + idx} sx={{ textAlign: "left" }}>
					{paragraph}
				</Typography>
			))}
		</BasicResponseMessage>
	);
}

export default memo(ContentResponseMessage);
