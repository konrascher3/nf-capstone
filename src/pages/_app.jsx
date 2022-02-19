import React from "react";

import { Global } from "@emotion/react";

import { globalStyle, fonts } from "../ions/styles";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { darkMode, lightMode } from "/src/ions/theme/theme";

// import checkMobile from "/src/ions/utils/checkMobile";

import useColorMode from "/src/ions/hooks/state/useColorMode";

const globalStyles = (
	<>
		<Global styles={globalStyle} />
		<Global styles={fonts} />
	</>
);

const App = ({ Component, pageProps }) => {
	const colorMode = useColorMode(state => state.colorMode);

	console.log(colorMode);
	return (
		<ThemeProvider theme={colorMode ? darkMode : lightMode}>
			{globalStyles}
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
