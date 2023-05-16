import { BasicResponseMessageType } from "../../Interface/Message/ResponseMessageType";

export const getLexResponse = async (message: string) => {
	const response = await fetch("/test", {
		method: "POST",
		body: JSON.stringify({
			message: message,
			userId: btoa(window.navigator.userAgent).slice(0, 30),
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = (await response.json()) as BasicResponseMessageType[];

	return data;
};
