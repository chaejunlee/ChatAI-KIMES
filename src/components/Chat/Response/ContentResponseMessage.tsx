import { Typography } from "@mui/material";
import { ContentResponseMessageType } from "../../../Interface/Message/ResponseMessageType";
import { containsUrl } from "../../../utils/chat";
import { BasicResponseMessage } from "./BasicResponseMessage";
import { ResponseLink } from "./ResponseLink";

export default function ContentResponseMessage({
	message,
}: {
	message: ContentResponseMessageType;
}) {
	if (containsUrl(message.content))
		return <ResponseLink messageContent={message.content} />;

	const multiLineMessage = message.content.split(/\\n|\n/g);

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
