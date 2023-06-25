import RefreshIcon from "@mui/icons-material/Refresh";
import styled from "@mui/material/styles/styled";

export const RotatingRefreshIcon = styled(RefreshIcon)`
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	animation: rotate 1s linear infinite;
`;
