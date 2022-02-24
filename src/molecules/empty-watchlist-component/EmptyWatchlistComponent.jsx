import React from "react";

// MUI Import
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom-components Imports
import LottieTumbleweed from "/src/atoms/lottie-tumbleweed/LottieTumbleweed";
import useColorMode from "/src/ions/hooks/state/useColorMode";
import { darkMode, lightMode } from "/src/ions/theme/theme";

const EmptyWatchlistComponent = () => {
	const colorMode = useColorMode(state => state.colorMode);
	return (
		<Box
			sx={{
				width: "100vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<LottieTumbleweed />
			<Typography
				variant="h4"
				color={colorMode ? darkMode.palette.text.primary : lightMode.palette.text.primary}
				sx={{ textAlign: "center" }}
				maxWidth={400}
			>
				It looks kinda empty here...
			</Typography>
		</Box>
	);
};

export default EmptyWatchlistComponent;
