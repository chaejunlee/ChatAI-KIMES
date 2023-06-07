import BeamworksLogo from "../../assets/BeamworksLogo.png";
import ChatAIDE from "../../assets/ChatAI-B.png";

export const Logo = () => {
	return (
		<div
			style={{
				position: "absolute",
				display: "grid",
				bottom: "-.5rem",
				placeItems: "center",
				left: "50%",
				transform: "translateX(-50%)",
			}}
		>
			<img
				style={{
					display: "block",
					width: "10rem",
					height: "auto",
					marginBottom: "0.3rem",
				}}
				src={BeamworksLogo}
				alt="Beamworks"
			/>
			<img
				style={{
					display: "block",
					width: "6rem",
					height: "auto",
					translate: "0.3rem 0rem",
				}}
				src={ChatAIDE}
				alt="Chat AIDE"
			/>
		</div>
	);
};
