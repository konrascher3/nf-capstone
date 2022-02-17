import React, { useEffect } from "react";

import { Global } from "@emotion/react";

import { globalStyle, fonts } from "../ions/styles";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "/src/ions/theme/theme";
import checkMobile from "../ions/utils/checkMobile";

// import checkMobile from "/src/ions/utils/checkMobile";

const globalStyles = (
	<>
		<Global styles={globalStyle} />
		<Global styles={fonts} />
	</>
);

const App = ({ Component, pageProps }) => {
	useEffect(() => {
		checkMobile();
	});

	return (
		<ThemeProvider theme={theme}>
			{globalStyles}
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
