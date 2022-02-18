import React, { useEffect } from "react";
import Head from "next/head";

import Cookies from "js-cookie";

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Axios Import
import axios from "axios";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

// Custom-components Imports
import LoadMoreButton from "/src/atoms/loadMoreButton/LoadMoreButton";
import CoinsDataGrid from "/src/molecules/coins-data-grid/DataGrid";
import FastMarquee from "/src/molecules/fast-marquee/FastMarquee";
import EmptyWatchlistComponent from "/src/molecules/empty-watchlist-component/EmptyWatchlistComponent";
import Drawer from "/src/organisms/drawer/Drawer";
import Layout from "/src/organisms/layout/index";
import GhostLogo from "/src/atoms/logo/ghost";
import theme from "/src/ions/theme/theme";

const Page = () => {
	const error = useStore(state => state.error);
	const coins = useStore(state => state.coins);
	const setCoins = useStore(state => state.setCoins);
	const loggedIn = useStore(state => state.loggedIn);
	const setMeta = useStore(state => state.setMeta);

	const meta = useStore(state => state.meta);

	const setLoading = useStore(state => state.setLoading);

	useEffect(() => {
		// Get and set initial favorites from the server
		const authToken = Cookies.get("coin-ghost-auth");
		if (authToken && loggedIn) {
			const options = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};
			axios.post(`/api/favorites/get`, {}, options).then(response => {
				const favorites = response.data.favorites;
				setMeta(favorites);
			});
		}
	}, []);

	useEffect(() => {
		// Get price-data from Coin-Gecko-API
		const condition = Object.values(meta).filter(Boolean).length > 0;
		if (condition) {
			setLoading(true);
			const fetchData = async () => {
				const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
					params: {
						vs_currency: "usd",
						ids: Object.keys(meta)
							.filter(key => meta[key])
							.join(","),
					},
				});
				setCoins(response.data);
				setLoading(false);
			};
			fetchData();
		} else {
			setCoins(null);
		}
	}, [meta]);

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}

			{/*Marquee component*/}
			<Box sx={{ m: 0.75 }}>
				<FastMarquee />
			</Box>

			{loggedIn ? (
				<div>
					{!coins && <EmptyWatchlistComponent />}
					{coins && (
						<>
							{/*Drawer component*/}
							<Drawer />
							{/*Data-grid component*/}
							<CoinsDataGrid />
							{/*Load-More-Button component*/}
							{coins?.length >= 20 ? (
								<Box sx={{ m: 0.75, display: "flex", justifyContent: "center" }}>
									<LoadMoreButton disabled={coins} />
								</Box>
							) : (
								""
							)}
						</>
					)}
				</div>
			) : (
				<div>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							m: 5,
						}}
					>
						<Box
							sx={{
								maxWidth: 400,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
								gap: 5,
								position: "absolute",
								top: "25%",
							}}
						>
							<GhostLogo size="60%" color={theme.palette.error.main} />
							<Typography
								variant="h4"
								sx={{ textAlign: "center", color: theme.palette.error.main }}
							>
								Please login to access your watchlist!
							</Typography>
						</Box>
					</Box>
				</div>
			)}
		</Layout>
	);
};

export default Page;
