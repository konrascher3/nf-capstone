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
		error: {
			main: "#FF5555",
		},
		success: {
			main: "#50FA7B",
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
		MuiTableCell: {
			styleOverrides: {
				root: {
					"&.MuiTableCell-root": {
						borderBottom: "1px solid hsla(225, 27%, 44%, 40%)",
					},
				},
			},
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					width: "100%",
					".MuiDataGrid-row:nth-child(even):not(:hover)": {
						backgroundColor: "hsl(225, 27%, 44%)",
					},
					".MuiDataGrid-columnHeaders": {
						border: "none",
						borderTopLeftRadius: 5,
						borderTopRightRadius: 5,
					},
					"&.MuiDataGrid-root": {
						border: "1px solid hsla(225, 27%, 54%, 50%)",
						borderRadius: 5,
					},
					".MuiDataGrid-columnSeparator": {
						visibility: "hidden",
					},
					".MuiDataGrid-columnHeader": {
						backgroundColor: "hsl(225, 27%, 44%)",
					},
					".MuiDataGrid-cell": {
						position: "relative",
						overflow: "visible",
						// backgroundColor: "hsl(225, 27%, 38%)",
						border: "none",
					},
					".MuiDataGrid-cell:focus-within": {
						outline: "none !important",
					},
				},
			},
		},
	},
});

export default theme;
