import { Skeleton, Stack } from "@mui/material";

export const LoadingResponseMessage = () => {
	return (
		<div className="message">
			<Stack justifyContent="flex-start" width="100%" marginTop={"-0.5rem"}>
				<Skeleton
					variant={"text"}
					sx={{ fontSize: "2.5rem", width: "clamp(100px, 30%, 400px)" }}
					animation={"wave"}
				/>
			</Stack>
		</div>
	);
};
