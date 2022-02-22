import React from "react";

import { Global } from "@emotion/react";

import { globalStyle, fonts } from "../ions/styles";

import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { darkMode, lightMode } from "/src/ions/theme/theme";

import useColorMode from "/src/ions/hooks/state/useColorMode";

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
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
