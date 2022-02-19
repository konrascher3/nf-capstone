import React from "react";

import Marquee from "react-fast-marquee";
import MarqueeContent from "/src/atoms/marquee-content/MarqueeContent";
import useStore from "../../ions/hooks/state/useStore";

const FastMarquee = () => {
	const colorMode = useStore(state => state.colorMode);

	return (
		<Marquee
			gradientWidth={20}
			speed={25}
			gradientColor={colorMode ? [76, 90, 133] : [248, 248, 242]}
		>
			<MarqueeContent />
		</Marquee>
	);
};

export default FastMarquee;
