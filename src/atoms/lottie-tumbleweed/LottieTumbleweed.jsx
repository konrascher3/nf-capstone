// Lottie Import
import { useLottie } from "lottie-react";
//// Tumbleweed Import
import animationData from "/src/ions/lotties/tumbleweed-light-theme.json";

const LottieTumbleweed = () => {
	const options = {
		animationData: animationData,
		loop: true,
		autoplay: true,
	};

	const { View } = useLottie(options);

	return View;
};

export default LottieTumbleweed;
