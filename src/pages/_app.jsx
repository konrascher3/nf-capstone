import React from "react";

import { Global } from "@emotion/react";

import { globalStyle, fonts } from "../ions/styles";

import { SnackbarProvider } from "notistack";

// MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Color-theme Imports
import { darkMode, lightMode } from "/src/ions/theme/theme";
import useColorMode from "/src/ions/hooks/state/useColorMode";

// Custom Components Import
import BackToTopButton from "/src/molecules/back-to-top-button/BackToTopButton";

const globalStyles = (
	<>
		<Global styles={globalStyle} />
		<Global styles={fonts} />
	</>
);

const App = ({ Component, pageProps }) => {
	const colorMode = useColorMode(state => state.colorMode);

	return (
		<ThemeProvider theme={colorMode ? darkMode : lightMode}>
			<SnackbarProvider maxSnack={3}>
				{globalStyles}
				<CssBaseline />
				<Component {...pageProps} />
				<BackToTopButton />
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
