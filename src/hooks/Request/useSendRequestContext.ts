import { useContext } from "react";
import { SendRequestContext } from "./SendRequestContext";

export default function useSendRequestContext() {
	return useContext(SendRequestContext);
}
