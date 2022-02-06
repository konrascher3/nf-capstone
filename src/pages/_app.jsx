import { Global } from "@emotion/react";
import React from "react";
import { globalStyle } from "../ions/styles";

import CssBaseline from '@mui/material/CssBaseline';


const App = ({ Component, pageProps }) => {
	return (
		<>
			<Global styles={globalStyle} />
			<CssBaseline />
			<Component {...pageProps} />
		</>
	);
};

export default App;
