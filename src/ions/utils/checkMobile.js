// If the user opens the app on a mobile device from a non-MetaMask-browser
// he is redirected to it by a deeplink

const checkMobile = async () => {
	const isMobileDevice = () => {
		return "ontouchstart" in window || "onmsgesturechange" in window;
	};

	const deepLinkAddress = () => {
		const hostname = window.location.hostname;
		const metaMaskDeepLink = `https://metamask.app.link/dapp/${hostname}`;
		return metaMaskDeepLink;
	};
	if (isMobileDevice()) {
		const { ethereum } = window;
		// Check if user is already in MetaMask-Provider
		try {
			if (ethereum.isMetaMask) {
				// Do nothing
			}
		} catch (error) {
			window.open(`${deepLinkAddress()}`);
		}
	}
};

export default checkMobile;
