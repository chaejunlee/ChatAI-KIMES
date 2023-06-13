import {
	ArrowDownwardOutlined,
	ArrowUpwardOutlined,
} from "@mui/icons-material";
import {
	getNextMessage,
	getPreviousMessage,
	hasMessageReachedBottom,
	hasMessageReachedTop,
} from "../../store/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { ReactElement } from "react";

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
	gap: 1rem;
	left: auto;
	right: 1rem;
	bottom: 5rem;
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
				width: "2.5rem",
				height: "2.5rem",
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
