import { Skeleton, Stack } from "@mui/material";
import { ANIMATION_TARGET } from "../../utils/Message/AnimationScope";
import { ResponseChat } from "../Chat/Response/ResponseChat";

export const LoadingResponseMessage = () => {
	return (
		<ResponseChat>
			<div className={ANIMATION_TARGET}>
				<Stack justifyContent="flex-start" width="100%" marginTop={"-0.5rem"}>
					<Skeleton
						variant={"text"}
						sx={{ fontSize: "2.5rem", width: "clamp(6.25rem, 30%, 25rem)" }}
						animation={"wave"}
					/>
				</Stack>
			</div>
		</ResponseChat>
	);
};
