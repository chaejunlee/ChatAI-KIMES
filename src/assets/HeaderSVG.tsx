import { SVGProps } from "react";

export default function HeaderSVG({ ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 1440 473"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g filter="url(#filter0_d_106_515)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5 0C2.23858 0 0 2.23858 0 5V244C0 246.761 2.23856 249 4.99998 249H386.942C428.953 249 466.493 277.509 499.893 302.992C548.226 339.869 628.564 364 719.5 364C810.436 364 890.774 339.87 939.107 302.992C972.507 277.509 1010.05 249 1052.06 249H1435C1437.76 249 1440 246.761 1440 244V5C1440 2.23858 1437.76 0 1435 0H5Z"
					fill="white"
				/>
			</g>
		</svg>
	);
}
