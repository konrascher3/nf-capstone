import axios from "axios";
import React, { useEffect } from "react";

import { formatCurrency } from "@coingecko/cryptoformat";

// MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

// Material Design Icons Imports
import { mdiArrowDownRight, mdiArrowUpRight } from "@mdi/js";
import Icon from "@mdi/react";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const DetailHeaderComponent = ({ id }) => {
	const detailData = useStore(state => state.detailData);

	const setLoading = useStore(state => state.setLoading);

	const meta = useStore(state => state.meta);
	// const metaData = meta[detailData?.id];
	const toggleFavorited = useStore(state => state.toggleFavorited);
	const publicAddress = useStore(state => state.publicAddress);

	useEffect(() => {
		setLoading(true);
		axios
			.put("/api/users/", {
				publicAddress: `${publicAddress}`,
				favorites: meta,
			})
			.then(favorites => {
				setLoading(false);
			});
	}, [meta]);

	const loggedIn = useStore(state => state.loggedIn);

	return (
		<>
			{/* Detail-header-component */}
			<Box
				sx={{
					display: "flex",
					// p: 1.5,
					// pb: 3,
					flexDirection: "column",
					gap: 1.25,
				}}
			>
				<Card
					sx={{
						ml: 0.75,
						mr: 0.75,
						p: 1,
						position: "relative",
					}}
				>
					{/*Detai-header-checkbox-component*/}
					{loggedIn ? (
						<>
							<Box style={{ position: "absolute" }}>
								<label>
									<input
										type="checkbox"
										style={{
											position: "fixed",
											top: "-100%",
											left: "-100vw",
										}}
										onChange={() => {
											toggleFavorited(detailData.id);
										}}
									/>
									{/*Increase tap-target*/}
									<div
										style={{
											height: 100,
											width: 1000,
											position: "relative",
											bottom: 9,
											left: -9,
											cursor: "pointer",
										}}
									>
										{/*Represents the custom-checkbox*/}
										<Box
											sx={{
												height: 113,
												width: 9,
												backgroundColor: meta[id] ? "#BD93F9" : "#BD93F966",
												position: "absolute",
												overflow: "hidden",
												top: -0.5,
											}}
										/>
									</div>
								</label>
							</Box>
						</>
					) : (
						""
					)}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							p: 0.5,
							ml: 0.75,
							gap: 1,
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.75,
							}}
						>
							<img
								style={{ width: 35, height: 35 }}
								src={`${detailData.image.large}`}
								alt={`Project-icon of ${detailData.name}`}
							/>
							<Typography
								variant="h6"
								sx={{
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
									overflow: "hidden",
								}}
							>
								{detailData.name}
							</Typography>
							<Typography
								variant="body1"
								sx={{
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
									overflow: "hidden",
								}}
							>
								{`(${detailData.symbol.toUpperCase()})`}
							</Typography>
							<Box
								sx={{
									// border: "1px solid #BD93F9",
									width: "auto",
									display: "flex",
									flexShrink: "0",
									borderRadius: 0.75,
									pl: 0.75,
									pr: 0.75,
									backgroundColor: "#FF79C6",
									marginLeft: "auto",
								}}
							>
								<Typography variant="body2" sx={{ p: 0.2 }} fontWeight={600}>
									Rank {detailData.market_data.market_cap_rank}
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.75,
							}}
						>
							<Typography variant="h5" fontWeight={600}>
								{`${formatCurrency(
									detailData.market_data.current_price.usd,
									"USD",
									"en",
									false
								)}`}
							</Typography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 0.25,
								}}
							>
								<Typography
									variant="body2"
									fontWeight={600}
									sx={{
										padding: 0,
										margin: 0,
									}}
									color={
										detailData.market_data.price_change_percentage_24h >= 0
											? "green"
											: "red"
									}
								>
									{`${parseFloat(
										detailData.market_data.price_change_percentage_24h
									).toFixed(2)}%`}
								</Typography>
								<Box
									sx={{
										display: "flex",
										justifySelf: "center",
									}}
								>
									{detailData.market_data.price_change_percentage_24h >= 0 ? (
										<Icon
											path={mdiArrowUpRight}
											padding={0}
											size={0.75}
											color="green"
										/>
									) : (
										<Icon
											path={mdiArrowDownRight}
											padding={0}
											size={0.75}
											color="red"
										/>
									)}
								</Box>
							</Box>
						</Box>
					</Box>
				</Card>
			</Box>
		</>
	);
};

export default DetailHeaderComponent;
