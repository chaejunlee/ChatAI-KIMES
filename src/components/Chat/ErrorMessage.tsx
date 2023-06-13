import { errorMessage } from "../../utils/Message/errorMessageContent";
import ContentResponseMessage from "./Response/ContentResponseMessage";

export function ErrorMessage() {
	return (
		<>
			{errorMessage.map((message, idx) => (
				<ContentResponseMessage key={`error-message${idx}`} message={message} />
			))}
		</>
	);
}
