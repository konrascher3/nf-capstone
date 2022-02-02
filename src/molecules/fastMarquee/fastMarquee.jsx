import React from "react"

import Marquee from "react-fast-marquee"
import MarqueeContent from "/src/atoms/marqueeContent/marqueeContent"

const FastMarquee = () => {
	return (
		<Marquee
			gradientWidth={10}
			speed={25}
		>
			<MarqueeContent/>
		</Marquee>
	)
}

export default FastMarquee
