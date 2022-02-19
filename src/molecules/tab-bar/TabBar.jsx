import React, { useEffect } from "react";
import PropTypes from "prop-types";

// MUI Imports

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const TabPanel = props => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		"aria-controls": `tabpanel-${index}`,
	};
}

const TabBar = () => {
	const endpoints = {
		topCoins:
			"coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
		stableCoins:
			"coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&sparkline=false",
		memeCoins:
			"coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&sparkline=false",
		nftCoins:
			"coins/markets?vs_currency=usd&category=non-fungible-tokens-nft&order=market_cap_desc&sparkline=false",
		dexCoins:
			"coins/markets?vs_currency=usd&category=decentralized-exchange&order=market_cap_desc&sparkline=false",
		gameCoins:
			"coins/markets?vs_currency=usd&category=gaming&order=market_cap_desc&sparkline=false",
		musicCoins:
			"coins/markets?vs_currency=usd&category=music&order=market_cap_desc&sparkline=false",
	};

	const tabPosition = useStore(state => state.tabPosition);
	const setTabPosition = useStore(state => state.setTabPosition);
	const { fetchData, loading } = useStore(state => state);

	const handleChange = (event, newValue) => {
		setTabPosition(newValue);
	};

	useEffect(() => {
		switch (tabPosition) {
			case 0:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.topCoins}`, "coins");
				break;
			case 1:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.stableCoins}`, "coins");
				break;
			case 2:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.memeCoins}`, "coins");
				break;
			case 3:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.nftCoins}`, "coins");
				break;
			case 4:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.dexCoins}`, "coins");
				break;
			case 5:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.gameCoins}`, "coins");
				break;
			case 6:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.musicCoins}`, "coins");
				break;
		}
	}, [tabPosition]);

	const variant = "body1";

	const colorMode = useStore(state => state.colorMode);

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					// TODO: Add breakpoint-switch for centered and varant="scrollable"
					// centered
					value={tabPosition}
					aria-label="Coin categories"
					variant="scrollable"
					scrollButtons="auto"
					textColor={colorMode ? "primary" : "secondary"}
					indicatorColor={colorMode ? "primary" : "secondary"}
					onChange={handleChange}
				>
					{/* Custom Categories */}
					<Tab
						disabled={loading}
						label={
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: 0.75,
								}}
							>
								<Typography variant={variant}>Top coins</Typography>
							</Box>
						}
						{...a11yProps("show_top_coins")}
					/>

					{/* Sectors */}
					<Tab
						label={<Typography variant={variant}>Stablecoins</Typography>}
						{...a11yProps("show_stablecoins")}
					/>
					<Tab
						label={<Typography variant={variant}>Meme coins</Typography>}
						{...a11yProps("show_meme_coins")}
					/>
					<Tab
						label={<Typography variant={variant}>NFTs</Typography>}
						{...a11yProps("show_nfts")}
					/>
					<Tab
						label={<Typography variant={variant}>Dex coins</Typography>}
						{...a11yProps("show_dex_tokens")}
					/>
					<Tab
						label={<Typography variant={variant}>Game fi</Typography>}
						{...a11yProps("show_game_fi")}
					/>
					<Tab
						label={<Typography variant={variant}>Music</Typography>}
						{...a11yProps("show_music")}
					/>
				</Tabs>
			</Box>
		</Box>
	);
};

export default TabBar;
