import { BasicResponseMessageType } from "../Interface/Message/ResponseMessageType";

export const getLexResponse = async (message: string) => {
	const userAgent = window.navigator.userAgent;

	const response = await fetch("/api", {
		method: "POST",
		body: JSON.stringify({
			message: message,
			userId: btoa(userAgent).slice(0, 30),
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = (await response.json()) as BasicResponseMessageType[];

	return data;
};
