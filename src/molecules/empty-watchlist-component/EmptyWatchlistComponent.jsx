import React from "react";

// MUI Import
import Typography from "@mui/material/Typography";

// Custom-components Imports
import LottieTumbleweed from "/src/atoms/lottie-tumbleweed/LottieTumbleweed";

import useStore from "/src/ions/hooks/state/useStore";
import { darkMode, lightMode } from "/src/ions/theme/theme";

const EmptyWatchlistComponent = () => {
	const colorMode = useStore(state => state.colorMode);
	return (
		<>
			<LottieTumbleweed />
			<Typography
				variant="h4"
				color={colorMode ? darkMode.palette.text.primary : lightMode.palette.text.primary}
				sx={{ textAlign: "center", margin: "0 auto" }}
				maxWidth={200}
			>
				It looks kinda empty here...
			</Typography>
		</>
	);
};

export default EmptyWatchlistComponent;
