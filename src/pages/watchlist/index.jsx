import React, { useEffect } from "react";
import Head from "next/head";

import Cookies from "js-cookie";

import jwtDecode from "jwt-decode";

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Axios Import
import axios from "axios";

// Lottie-component Import
import LottieTumbleweed from "/src/atoms/lottie-tumbleweed/LottieTumbleweed";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

// Custom-components Imports

import LoadMoreButton from "/src/atoms/loadMoreButton/LoadMoreButton";
import CoinsDataGrid from "/src/molecules/coins-data-grid/DataGrid";
import FastMarquee from "/src/molecules/fast-marquee/FastMarquee";
import Drawer from "/src/organisms/drawer/Drawer";
import Layout from "/src/organisms/layout/index";

import GhostLogo from "/src/atoms/logo/ghost";

const Page = () => {
	const error = useStore(state => state.error);
	const coins = useStore(state => state.coins);
	const setCoins = useStore(state => state.setCoins);
	const loggedIn = useStore(state => state.loggedIn);
	const setMeta = useStore(state => state.setMeta);

	const setPublicAddress = useStore(state => state.setPublicAddress);
	const publicAddress = useStore(state => state.publicAddress);
	const meta = useStore(state => state.meta);

	const setLoading = useStore(state => state.setLoading);

	useEffect(() => {
		const authToken = Cookies.get("coin-ghost-auth");

		if (authToken && loggedIn) {
			const options = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};

			// Get favorites from server only with valid JWT
			axios.post(`/api/favorites/get`, {}, options).then(response => {
				const favorites = response.data[0].favorites;
				const condition = Object.keys(favorites).filter(Boolean).length;
				if (condition) {
					setLoading(true);
					const fetchData = async () => {
						const response = await axios.get(
							"https://api.coingecko.com/api/v3/coins/markets",
							{
								params: {
									vs_currency: "usd",
									ids: Object.keys(favorites)
										.filter(key => favorites[key])
										.join(","),
								},
							}
						);
						setCoins(response.data);
						setMeta(favorites);
						setPublicAddress(publicAddress);
						setLoading(false);
					};
					fetchData();
				} else {
					setCoins(null);
				}
			});
		}
	}, []);

	useEffect(() => {
		const authToken = Cookies.get("coin-ghost-auth");

		if (authToken && loggedIn) {
			const options = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};
			axios.post("/api/favorites/put", { favorites: meta }, options);
		}
		if (
			Object.keys(
				Object.keys(meta)
					.filter(key => meta[key])
					.join(",")
			).length > 0
		) {
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
					{!coins && (
						<div>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									gap: 5,
									m: 5,
									minHeight: "50vh",
								}}
							>
								<Box sx={{ maxWidth: "600px" }}>
									<LottieTumbleweed />
								</Box>
								<Typography variant="h6">It looks kinda empty here...</Typography>
							</Box>
						</div>
					)}
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
							gap: 5,
							m: 5,
							minHeight: "50vh",
						}}
					>
						<Box
							sx={{
								color: "#FF5555",
								maxWidth: "600px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
								gap: 5,
							}}
						>
							<GhostLogo size="70%" />
							<Typography variant="h6" sx={{ textAlign: "center" }}>
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
