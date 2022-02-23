// Lottie Import
import { useLottie } from "lottie-react";
//// Tumbleweed Import
import animationData from "/src/ions/lotties/tumbleweed-dark-theme.json";

const LottieTumbleweed = () => {
	const options = {
		animationData: animationData,
		loop: true,
		autoplay: true,
		style: {
			maxWidth: 400,
			margin: "0 auto",
		},
	};

	const { View } = useLottie(options);

	return View;
};

export default LottieTumbleweed;
