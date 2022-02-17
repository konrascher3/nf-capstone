import React from "react";

import Marquee from "react-fast-marquee";
import MarqueeContent from "/src/atoms/marquee-content/MarqueeContent";

import { useTheme } from "@mui/material/styles";

const FastMarquee = () => {
	const theme = useTheme();
	return (
		<Marquee gradientWidth={20} speed={25} gradientColor={[76, 90, 133]}>
			<MarqueeContent />
		</Marquee>
	);
};

export default FastMarquee;
