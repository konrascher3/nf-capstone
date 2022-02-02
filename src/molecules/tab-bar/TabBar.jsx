import Box from "@mui/material/Box";
import React from "react";

// MUI Imports
import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const TabPanel = (props) => {
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
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`,
	};
}

const TabBar = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					aria-label="Coin categories"
					onChange={handleChange}
					variant="scrollable"
					scrollButtons="auto"
				>
					{/* Custom Categories */}
					<Tab value="show_top_coins" label="Top Coins 👑" {...a11yProps("show_top_coins")} />
					{/* Fetches coins-data based on Mcap-rank */}
					{/*https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false*/}
					{/* Returns API-Endpoint "/coins/markets" and params "target-currency" and "sort-order" */}

					<Tab value="show_gainers_losers" label="Gainers & Losers" {...a11yProps("show_gainers_losers")} />
					{/* Fetches two coins-data-sets based on Mcap-rank ascending and descending*/}
					{/*https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false*/}
					{/* Returns API-Endpoint "/coins/markets" and params "target-currency" and "sort-order" */}

					<Tab value="show_trending" label="Trending 🔥" {...a11yProps("show_trending")} />
					{/* Fetches coin-IDs based on coinGecko-trending */}
					{/* https://api.coingecko.com/api/v3/search/trending */}
					{/* Coin-IDs need to be mapped against "/coins/markets" to get coin-data*/}

					{/* Sectors */}
					{/* Fetches coins-data based on Mcap-rank and Category-ID */}
					{/* Category-ID:  e.g.:"stablecoins"*/}
					{/*https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false*/}
					{/* Returns API-Endpoint "/coins/markets" and params "target-currency", "sort-order", and "category-id" */}
					<Tab value="show_stablecoins" label="Stablecoins" {...a11yProps("show_stablecoins")} />
					<Tab value="show_meme_coins" label="Meme coins" {...a11yProps("show_meme_coins")} />
					<Tab value="show_nfts" label="NFTs" {...a11yProps("show_nfts")} />
					<Tab value="show_dex_tokens" label="DEX Tokens" {...a11yProps("show_dex_tokens")} />
					<Tab value="show_game_fi" label="Game Fi" {...a11yProps("show_game_fi")} />
					<Tab value="show_music" label="Music" {...a11yProps("show_music")} />
				</Tabs>
			</Box>
			{console.log(value)}
		</Box>
	);
}

export default TabBar
