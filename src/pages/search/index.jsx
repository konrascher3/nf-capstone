import Head from "next/head";
import React from "react";

import Layout from "/src/organisms/layout/index";

// MUI Imports
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore"

// Custom-components Imports
import LoadMoreButton from "../../atoms/loadMoreButton/LoadMoreButton";
import CoinsDataGrid from "../../molecules/coins-data-grid/DataGrid";
import Searchbar from "../../molecules/searchbar/Searchbar";


const Page = () => {
	const { error, coins } = useStore((state) => state);

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}
			<div>
				{/*Data-grid component*/}
				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					m: 3
				}}
				>
					<Searchbar />
				</Box>

				{coins && (
					<div>
						{/*Data-grid component*/}
						<Box >
							<CoinsDataGrid />
						</Box>

						{/*Load-More-Button component*/}
						{coins.length >= 20 ?
							<Box sx={{ m: .75, display: "flex", justifyContent: "center" }}>
								<LoadMoreButton disabled={coins} />
							</Box> : ""}
					</div>
				)}

			</div>
		</Layout>
	);
};

export default Page;
