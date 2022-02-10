import React, { useEffect} from "react";
import { useRouter } from "next/router";

import Head from "next/head";

// MUI Import
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Custom Imports
import Layout from "/src/organisms/layout/index";
import FastMarquee from "/src/molecules/fast-marquee/FastMarquee";
import Chart from "/src/molecules/chart/Chart";
import DetailHeaderComponent from "/src/molecules/detail-header-component/DetailHeaderComponent";
import MacroDataTable from "/src/molecules/macro-data-table/MacroDataTable"

// useStore
import useStore from "/src/ions/hooks/state/useStore";


const Page = () => {
	const { query: { slug } } = useRouter();
	const fetchData = useStore((state) => state.fetchData);
	const detailData = useStore((state) => state.detailData);

	const setTimeFrame = useStore((state) => state.setTimeFrame);
	const setInterval = useStore((state) => state.setInterval);

	// Initialize toggle-button group
	useEffect(() => {
		setTimeFrame(7);
		setInterval("daily")
	},[setInterval, setTimeFrame])

	useEffect(() => {
		fetchData(`https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`, "detailData")
	}, [fetchData, slug])

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>

			{/*Marquee component*/}
			<Box sx={{ m: .75 }}>
				<FastMarquee />
			</Box>

			{detailData && (
				<Stack
					spacing={3}
					sx={{ m: .25 }}
				>
					{/* Detail-header-component */}
					<DetailHeaderComponent />

					{/*Chart component*/}
					<Box>
						<Card sx={{
							ml: .75,
							mr: .75,
							p: .5
						}}
						>
							<Chart />
						</Card>
					</Box>

					{/* Macro-data-component*/}
					<Box>
						<MacroDataTable />
					</Box>

				</Stack>
			)}
		</Layout>
	);
};
export default Page;
export const getServerSideProps = () => {
	return {
		props: {},
	}
}
