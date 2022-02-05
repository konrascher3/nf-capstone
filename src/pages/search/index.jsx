import Head from "next/head";
import React from "react";

import Layout from "/src/organisms/layout/index";

// MUI Import
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import { styled } from "@mui/material/"

// Material-design-icons Imports
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

// useStore
import useStore from "/src/ions/hooks/state/useStore"
import CoinsDataGrid from "../../molecules/coins-data-grid/DataGrid";

// Styled components
const RoundSearchField = styled(TextField)(() => ({
	display: "flex",
	flex: 1,
	color: "red",
	"& fieldset": {
		borderRadius: 9,
	},
	".MuiOutlinedInput-notchedOutline": {
		borderColor: "transparent",
	}
}));


const Page = () => {
	const { loading, error } = useStore((state) => state);
	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			<div>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					m: 3
				}}
				>
					<Paper
						component="form"
						elevation={1}
						sx={{
							p: "2px 4px",
							display: "flex",
							alignItems: "center",
							width: 350,
							borderRadius: 2.5,
							// border: ".5px solid grey",
						}}
					>
						<RoundSearchField
							variant="outlined"
							placeholder="Search Coins"
							inputProps={{ "aria-label": "search coins" }}
							size="small"
						/>
						<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
						<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
							<Icon path={mdiMagnify} size={1} title="Search coins"/>
						</IconButton>
					</Paper>
				</Box>

				{/*Data-grid component*/}
				<Box >
					<CoinsDataGrid />
				</Box>
			</div>
		</Layout>
	);
};

export default Page;
