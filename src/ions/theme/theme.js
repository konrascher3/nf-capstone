import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {},
	typography: {
		fontFamily: `"Roboto Condensed", Helvetica, Arial, sans-serif`,
	},
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					fontFamily: `"Roboto Condensed", Helvetica, Arial, sans-serif`,
				},
			},
		},
	},
});

export default theme;
