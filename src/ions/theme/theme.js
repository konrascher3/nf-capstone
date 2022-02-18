import { createTheme } from "@mui/material/styles";

export const darkMode = createTheme({
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
			main: "hsl(0, 100%, 67%)",
		},
		success: {
			main: "hsl(135, 94%, 65%)",
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
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root.MuiAccordion-root": {
						background: "none",
					},
				},
			},
		},
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
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					"&.MuiAccordionDetails-root": {
						padding: 0,
						paddingBottom: 30,
					},
				},
			},
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					width: "99%",
					margin: "0 auto",
					".MuiDataGrid-row:nth-of-type(even):not(:hover)": {
						backgroundColor: "hsl(225, 27%, 44%)",
					},
					".MuiDataGrid-columnHeaders": {
						border: "none",
						borderTopLeftRadius: 4,
						borderTopRightRadius: 4,
					},
					"&.MuiDataGrid-root": {
						border: "1px solid hsla(225, 27%, 54%, 50%)",
						borderRadius: 5,
					},
					".MuiDataGrid-columnSeparator": {
						visibility: "hidden",
					},
					".MuiDataGrid-columnHeader": {
						backgroundColor: "hsl(225, 27%, 49%)",
					},
					".MuiDataGrid-cell": {
						position: "relative",
						overflow: "visible",
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

export const lightMode = createTheme({
	palette: {
		mode: "light",
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
			main: "hsl(0, 100%, 67%)",
		},
		success: {
			main: "hsl(135, 94%, 65%)",
		},
		text: {
			primary: "hsl(231, 15%, 18%)",
		},
		background: {
			paper: "hsl(60, 30%, 86%)",
			default: "hsl(60, 30%, 96%)",
		},
	},
	typography: {
		fontFamily: `"Roboto Condensed", Helvetica, Arial, sans-serif`,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root.MuiAccordion-root": {
						background: "none",
					},
				},
			},
		},
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
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					"&.MuiAccordionDetails-root": {
						padding: 0,
						paddingBottom: 30,
					},
				},
			},
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					width: "99%",
					margin: "0 auto",
					".MuiDataGrid-row:nth-of-type(even):not(:hover)": {
						backgroundColor: "hsl(225, 27%, 44%)",
					},
					".MuiDataGrid-columnHeaders": {
						border: "none",
						borderTopLeftRadius: 4,
						borderTopRightRadius: 4,
					},
					"&.MuiDataGrid-root": {
						border: "1px solid hsla(225, 27%, 54%, 50%)",
						borderRadius: 5,
					},
					".MuiDataGrid-columnSeparator": {
						visibility: "hidden",
					},
					".MuiDataGrid-columnHeader": {
						backgroundColor: "hsl(225, 27%, 49%)",
					},
					".MuiDataGrid-cell": {
						position: "relative",
						overflow: "visible",
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
