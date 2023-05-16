import RefreshIcon from "@mui/icons-material/Refresh";
import { keyframes, styled } from "@mui/material";

export const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

export const RotatingRefreshIcon = styled(RefreshIcon)`
	animation: ${rotate} 1s linear infinite;
`;
