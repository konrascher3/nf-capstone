import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "dark",
		common: {
			black: "hsl(231, 15%, 18%)",
			white: "hsl(60, 30%, 96%)",
		},
		primary: {
			main: "hsl(326, 100%, 74%)",
		},
		secondary: {
			main: "hsl(265, 89%, 78%)",
		},
		text: {
			primary: "hsl(60, 30%, 96%)",
		},
		background: {
			paper: "hsl(225, 27%, 31%)",
			default: "hsl(225, 27%, 41%)",
		},
	},
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
