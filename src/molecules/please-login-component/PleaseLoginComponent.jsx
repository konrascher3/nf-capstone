import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Custom-component Imports
import GhostLogo from "/src/atoms/logo/ghost";

import useStore from "/src/ions/hooks/state/useStore";
import useColorMode from "/src/ions/hooks/state/useColorMode";

import { darkMode, lightMode } from "/src/ions/theme/theme";

const PleaseLoginComponent = () => {
	const colorMode = useColorMode(state => state.colorMode);
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
					position: "absolute",
					top: "25%",
				}}
			>
				<GhostLogo
					size="60%"
					color={colorMode ? darkMode.palette.error.main : lightMode.palette.error.main}
				/>
				<Typography
					variant="h4"
					sx={{
						textAlign: "center",
						color: colorMode
							? darkMode.palette.error.main
							: lightMode.palette.error.main,
					}}
				>
					Please login to access your watchlist!
				</Typography>
			</Box>
		</Box>
	);
};

export default PleaseLoginComponent;
