import styled from "@emotion/styled";
import ArrowDownwardOutlined from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlined from "@mui/icons-material/ArrowUpwardOutlined";
import IconButton from "@mui/material/IconButton";
import { ReactElement } from "react";
import {
	getNextMessage,
	getPreviousMessage,
	hasMessageReachedBottom,
	hasMessageReachedTop,
} from "../../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export function ScrollButton() {
	const dispatch = useAppDispatch();
	const showTopButton = !useAppSelector(hasMessageReachedTop);
	const showBottomButton = !useAppSelector(hasMessageReachedBottom);

	return (
		<IconButtonContainer>
			<IconButtonWrapper
				onClick={() => {
					dispatch(getPreviousMessage());
				}}
				enable={showTopButton}
			>
				<ArrowUpwardOutlined />
			</IconButtonWrapper>
			<IconButtonWrapper
				onClick={() => {
					dispatch(getNextMessage());
				}}
				enable={showBottomButton}
			>
				<ArrowDownwardOutlined />
			</IconButtonWrapper>
		</IconButtonContainer>
	);
}

const IconButtonContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: clamp(12px, 1rem, 30px);
	left: auto;
	right: clamp(8px, 0.5rem, 16px);
	bottom: clamp(90px, 5rem, 160px);
	z-index: 100;
`;

export const IconButtonWrapper = ({
	onClick,
	enable,
	children,
}: {
	onClick: () => void;
	enable: boolean;
	children: ReactElement;
}) => {
	return (
		<IconButton
			style={{
				width: "clamp(30px, 2.5rem, 60px)",
				height: "clamp(30px, 2.5rem, 60px)",
				background: "#fafafa",
				filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))",
				borderRadius: "50%",
				backdropFilter: "blur(0)",
				transform: "translateZ(0)",
				transition: "opacity 0.5s ease-in-out",
			}}
			onClick={onClick}
			disabled={!enable}
		>
			{children}
		</IconButton>
	);
};
