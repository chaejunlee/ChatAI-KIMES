import { Skeleton, Stack } from "@mui/material";

export const LoadingResponseMessage = () => {
	return (
		<Stack justifyContent="flex-start">
			<Skeleton
				variant={"text"}
				sx={{ fontSize: "2.5rem", width: "clamp(100px, 30%, 400px)" }}
				animation={"wave"}
			/>
		</Stack>
	);
};
