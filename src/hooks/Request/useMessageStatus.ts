import { useContext } from "react";
import { SendRequestContext } from "./SendRequestContext";
import { useAppSelector } from "../../store/store";

export default function useMessageStatus() {
	const status = useAppSelector((state) => state.messages.status);

	return { status: status === "loading" };
}
