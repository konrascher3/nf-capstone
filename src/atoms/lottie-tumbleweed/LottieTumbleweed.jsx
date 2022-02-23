import React from "react";
// Lottie Import
import Lottie from "react-lottie-player";

//// Tumbleweed Import
import animationData from "/src/ions/lotties/tumbleweed-dark-theme.json";

const LottieTumbleweed = () => {
	return <Lottie loop play animationData={animationData} style={{ maxWidth: 400 }} />;
};

export default LottieTumbleweed;
