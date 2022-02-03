import Head from "next/head";
import React from "react";
import Layout from "../organisms/layout";

import FastMarquee from "/src/molecules/fast-marquee/FastMarquee"

// MUI Imports
import Box from "@mui/material/Box"

// Custom-components Imports
import TabBar from "/src/molecules/tab-bar/TabBar"
import CoinsDataGrid from "/src/molecules/coins-data-grid/DataGrid"
import LoadMoreButton from "/src/atoms/loadMoreButton/LoadMoreButton"
import Drawer from "/src/organisms/drawer/Drawer"

// useStore
import useStore from "../ions/hooks/state/useStore";


const Page = () => {
const {data, error, fetchData} = useStore((state) => state);

	// Initial fetch if data = null
	if(data === null) {
		fetchData("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
	}

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}
			{data && (
				<>
					{/*Drawer component*/}
					<Drawer />

					{/*Tab-bar component*/}
					< TabBar />

					{/*Marquee component*/}
					<Box sx={{ m: .75 }}>
						<FastMarquee />
					</Box>

					{/*Data-grid component*/}
					<Box >
						<CoinsDataGrid />
					</Box>

					{/*Load-More-Button component*/}
					<Box sx={{ m: .75, display: "flex", justifyContent: "center" }}>
						<LoadMoreButton />
					</Box>

				</>
			)}
		</Layout>
	);
};

export default Page;
