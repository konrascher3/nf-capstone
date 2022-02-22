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
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						backgroundColor: "hsl(225, 27%, 31%)",
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: "hsl(225, 27%, 41%)",
						minHeight: 24,
						border: "2px solid hsl(225, 27%, 31%)",
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: "hsl(225, 27%, 51%)",
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: "hsl(225, 27%, 51%)",
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "hsl(225, 27%, 51%)",
					},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
						backgroundColor: "hsl(225, 27%, 31%)",
					},
				},
			},
		},
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
		MuiDataGrid: {
			styleOverrides: {
				root: {
					width: "99%",
					margin: "0 auto",

					".MuiDataGrid-columnHeaders": {
						border: "none",
						borderTopLeftRadius: 4,
						borderTopRightRadius: 4,
					},
					"&.MuiDataGrid-root": {
						border: "1px solid hsla(225, 27%, 54%, 50%)",
						borderRadius: 5,
					},
					".MuiDataGrid-row.Mui-selected": {
						backgroundColor: "hsla(265, 89%, 78%, 15%)",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row": {
						backgroundColor: "inherit",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row:nth-of-type(even):not(:hover)": {
						backgroundColor: "hsla(225, 27%, 44%)",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row.Mui-selected:hover": {
						backgroundColor: "hsla(265, 89%, 78%, 20%) !important",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row.Mui-selected:nth-of-type(even)": {
						backgroundColor: "hsla(265, 89%, 78%, 30%)",
						transition: "background-color .25s",
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
			main: "hsl(60, 30%, 99%)",
		},
		secondary: {
			main: "hsl(225, 27%, 21%)",
		},
		// error: {
		// 	main: "hsl(0, 100%, 67%)",
		// },
		// success: {
		// 	main: "hsl(135, 94%, 65%)",
		// },
		text: {
			primary: "hsl(231, 15%, 18%)",
		},
		background: {
			paper: "hsl(60, 30%, 99%)",
			default: "hsl(60, 30%, 99%)",
		},
	},
	typography: {
		fontFamily: `"Roboto Condensed", Helvetica, Arial, sans-serif`,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						backgroundColor: "hsla(225, 27%, 79%, 20%)",
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: "hsl(60, 30%, 99%)",
						minHeight: 24,
						border: "2px solid hsla(225, 27%, 79%, 90%)",
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: "hsla(225, 27%, 79%, 20%)",
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: "hsla(225, 27%, 79%, 20%)",
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "hsla(225, 27%, 79%, 20%)",
					},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
						backgroundColor: "hsl(60, 30%, 96%)",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root.MuiAccordion-root": {
						background: "none",
					},
				},
			},
		},
		MuiDataGrid: {
			styleOverrides: {
				root: {
					width: "99%",
					margin: "0 auto",
					".MuiDataGrid-columnHeaders": {
						border: "none",
						borderTopLeftRadius: 4,
						borderTopRightRadius: 4,
					},
					"&.MuiDataGrid-root": {
						border: "1px solid hsla(225, 27%, 54%, 50%)",
						borderRadius: 5,
					},
					".MuiDataGrid-row.Mui-selected": {
						backgroundColor: "hsla(265, 89%, 78%, 20%)",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row": {
						backgroundColor: "inherit",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row:hover": {
						backgroundColor: "hsla(225, 27%, 69%, 40%)",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row:nth-of-type(even):not(:hover)": {
						backgroundColor: "hsla(225, 27%, 79%, 30%)",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row.Mui-selected:hover": {
						backgroundColor: "hsla(265, 89%, 78%, 40%) !important",
						transition: "background-color .25s",
					},
					".MuiDataGrid-row.Mui-selected:nth-of-type(even)": {
						backgroundColor: "hsla(265, 89%, 78%, 50%)",
						transition: "background-color .25s",
					},
					".MuiDataGrid-columnSeparator": {
						visibility: "hidden",
					},
					".MuiDataGrid-columnHeader": {
						backgroundColor: "hsla(225, 27%, 59%, 40%)",
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
