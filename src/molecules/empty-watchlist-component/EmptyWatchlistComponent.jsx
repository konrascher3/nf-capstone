import React, { useEffect, useState } from "react";

// MUI Import
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom-components Imports
import LottieTumbleweed from "/src/atoms/lottie-tumbleweed/LottieTumbleweed";
import useColorMode from "../../ions/hooks/state/useColorMode";
import { darkMode, lightMode } from "../../ions/theme/theme";

const EmptyWatchlistComponent = () => {
	const [colorTheme, setColorTheme] = useState(darkMode);
	const colorMode = useColorMode(state => state.colorMode);

	useEffect(() => {
		setColorTheme(colorMode);
	}, [colorMode]);

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
				sx={{
					textAlign: "center",
					color: colorTheme
						? darkMode.palette.text.primary
						: lightMode.palette.text.primary,
				}}
				maxWidth={400}
			>
				It looks kinda empty here...
			</Typography>
		</Box>
	);
};

export default EmptyWatchlistComponent;
