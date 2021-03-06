import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../organisms/layout";

import FastMarquee from "/src/molecules/fast-marquee/FastMarquee";

// MUI Import
import Box from "@mui/material/Box";

// Custom-components Imports
import TabBar from "/src/molecules/tab-bar/TabBar";
import CoinsDataGrid from "/src/molecules/coins-data-grid/DataGrid";
import LoadMoreButton from "/src/atoms/loadMoreButton/LoadMoreButton";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const Page = () => {
	const setTimeFrame = useStore(state => state.setTimeFrame);
	const setInterval = useStore(state => state.setInterval);

	const error = useStore(state => state.error);
	const fetchData = useStore(state => state.fetchData);
	const coins = useStore(state => state.coins);

	// Reset coins-array
	useEffect(() => {
		if (coins === null) {
			fetchData(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
				"coins"
			);
		}
	}, [coins, fetchData]);

	// Initialize toggle-button group
	useEffect(() => {
		setTimeFrame(7);
		setInterval("daily");
	}, [setInterval, setTimeFrame]);

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}
			{coins && (
				<>
					{/*Tab-bar component*/}
					<TabBar />

					{/*Marquee component*/}
					<Box sx={{ m: 0.75 }}>
						<FastMarquee />
					</Box>

					{/*Data-grid component*/}
					<CoinsDataGrid />

					{/*Load-More-Button component*/}
					{coins?.length >= 20 ? (
						<Box
							sx={{
								m: 0.75,
								mb: 6,
								display: "flex",
								justifyContent: "center",
							}}
						>
							<LoadMoreButton disabled={coins} />
						</Box>
					) : (
						""
					)}
				</>
			)}
		</Layout>
	);
};

export default Page;
