import React, { useState, useEffect } from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Custom-component Imports
import GhostLogo from "/src/atoms/logo/ghost";

import useColorMode from "/src/ions/hooks/state/useColorMode";

import { darkMode, lightMode } from "/src/ions/theme/theme";

const PleaseLoginComponent = () => {
	const colorMode = useColorMode(state => state.colorMode);

	const [colorTheme, setColorTheme] = useState(darkMode);

	useEffect(() => {
		setColorTheme(colorMode);
	}, [colorMode]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				m: 5,
			}}
		>
			<Box
				sx={{
					maxWidth: 400,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: 5,
				}}
			>
				<GhostLogo
					size="60%"
					color={colorTheme ? darkMode.palette.error.main : lightMode.palette.error.main}
				/>
				<Typography
					variant="h4"
					sx={{
						textAlign: "center",
						color: colorTheme
							? darkMode.palette.error.main
							: lightMode.palette.error.main,
					}}
				>
					Please log in to access your watchlist!
				</Typography>
			</Box>
		</Box>
	);
};

export default PleaseLoginComponent;
