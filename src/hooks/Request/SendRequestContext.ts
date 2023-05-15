import { createContext } from "react";

export interface SendRequestContextInterface {
	loading: boolean;
	sendRequest: (message: string) => void;
}

export const SendRequestContext =
	createContext<SendRequestContextInterface | null>(null);
