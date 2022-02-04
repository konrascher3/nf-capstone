import React, { useEffect } from "react";
import Head from "next/head";

// MUI Imports
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";

// Axios Import
import axios from "axios"

// Lottie-component Import
import LottieTumbleweed from "/src/atoms/lottie-tumbleweed/LottieTumbleweed"

// useStore
import useStore from "/src/ions/hooks/state/useStore"

// Custom-components Imports

import LoadMoreButton from "/src/atoms/loadMoreButton/LoadMoreButton";
import CoinsDataGrid from "/src/molecules/coins-data-grid/DataGrid";
import FastMarquee from "/src/molecules/fast-marquee/FastMarquee";
import Drawer from "/src/organisms/drawer/Drawer";
import Layout from "/src/organisms/layout/index";

import filterObject from "/src/ions/utils/filter-objects"


const Page = () => {
	const { coins, loading, error, meta, setCoins } = useStore((state) => state);

	// Coins with favorited: true from meta
	const favoritedCoins = filterObject(meta, "favorited", false)
	useEffect(() => {
		if (Object.keys(favoritedCoins).length > 0){
			const fetchData = async () => {
				const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",
					{ params:
							{
								vs_currency: "usd",
								ids: Object.keys(favoritedCoins).join(",")
							}
					});
				setCoins(response.data);
			};
			fetchData()
		} else {
			setCoins(null)
		}
	}, [meta])

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
			{!coins && (<div>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 5,
					m: 5,
					minHeight: "50vh"
				}}
				>
					<LottieTumbleweed />
					<Typography variant="h6">It looks kinda empty here...</Typography>
				</Box>
			</div>)}
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{coins && (
				<div>
					{/*Drawer component*/}
					<Drawer />

					{/*Data-grid component*/}
					<Box >
						<CoinsDataGrid />
					</Box>

					{/*Load-More-Button component*/}
					<Box sx={{ m: .75, display: "flex", justifyContent: "center" }}>
						<LoadMoreButton />
					</Box>
				</div>
			)}
		</Layout>
	);
};

export default Page;
