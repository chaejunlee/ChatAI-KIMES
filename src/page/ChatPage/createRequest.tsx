import RequestMessageType from "../../Interface/Message/RequestMessageType";

export const createRequest = (message: string) => {
	return {
		message: message,
		type: "request",
		userId: window.navigator.userAgent,
	} as RequestMessageType;
};
