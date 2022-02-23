import Head from "next/head";
import React, { useState, useEffect } from "react";

import { Global } from "@emotion/react";

import { fonts } from "../ions/styles";

import { SnackbarProvider } from "notistack";

// MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Color-theme Imports
import { darkMode, lightMode } from "/src/ions/theme/theme";
import useColorMode from "/src/ions/hooks/state/useColorMode";

// Custom Components Import
import BackToTopButton from "/src/molecules/back-to-top-button/BackToTopButton";

const globalStyles = <Global styles={fonts} />;

const App = ({ Component, pageProps }) => {
	const [theme, setTheme] = useState(darkMode);
	const colorMode = useColorMode(state => state.colorMode);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setTheme(colorMode ? darkMode : lightMode);
		}, 1);

		return () => {
			clearTimeout(timeout);
		};
	}, [colorMode]);

	return (
		<>
			<Head>
				<title>coin ghost</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3}>
					{globalStyles}
					<CssBaseline />
					<Component {...pageProps} />
					<BackToTopButton />
				</SnackbarProvider>
			</ThemeProvider>
		</>
	);
};

export default App;
