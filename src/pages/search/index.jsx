import axios from "axios";
import Head from "next/head";
import React, { useEffect } from "react";

import Layout from "/src/organisms/layout/index";

// MUI Imports
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

// Custom-components Imports
import LoadMoreButton from "../../atoms/loadMoreButton/LoadMoreButton";
import CoinsDataGrid from "../../molecules/coins-data-grid/DataGrid";
import Searchbar from "../../molecules/searchbar/Searchbar";

const Page = () => {
	const error = useStore(state => state.error);
	const coins = useStore(state => state.coins);
	const setCoins = useStore(state => state.setCoins);
	const setLoading = useStore(state => state.setLoading);

	// Get trending coins in search if search-page is opened
	useEffect(() => {
		const getTrending = async () => {
			setLoading(true);
			const { data } = await axios.get("https://api.coingecko.com/api/v3/search/trending");
			if (data) {
				const fetchData = async () => {
					const response = await axios.get(
						"https://api.coingecko.com/api/v3/coins/markets",
						{
							params: {
								vs_currency: "usd",
								ids: data.coins.map(({ item }) => item.id).join(","),
							},
						}
					);
					setCoins(response.data);
					setLoading(false);
				};
				fetchData();
			} else {
				setLoading(false);
			}
		};
		getTrending();
	}, []);

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}
			<div>
				{/*Data-grid component*/}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						m: 3,
					}}
				>
					<Searchbar />
				</Box>

				{coins && (
					<div>
						{/*Data-grid component*/}
						<Box>
							<CoinsDataGrid />
						</Box>

						{/*Load-More-Button component*/}
						{coins.length >= 20 ? (
							<Box sx={{ m: 0.75, display: "flex", justifyContent: "center" }}>
								<LoadMoreButton disabled={coins} />
							</Box>
						) : (
							""
						)}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Page;
