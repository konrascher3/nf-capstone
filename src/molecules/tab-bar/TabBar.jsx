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
					// TODO: Add breakpoint-switch for centered and varant="scrollable"
					// centered
					value={value}
					aria-label="Coin categories"
					variant="scrollable"
					scrollButtons="auto"
					onChange={handleChange}
				>
					{/* Custom Categories */}
					<Tab label="Top Coins 👑" {...a11yProps("show_top_coins")} />

					{/* TODO: Requires custom filter; build custom dataset; develop a proxy */}
					{/*<Tab label="Gainers & Losers" {...a11yProps("show_gainers_losers")} />*/}
					{/* Fetches two coins-data-sets based on Mcap-rank ascending and descending*/}
					{/*https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false*/}
					{/* Returns API-Endpoint "/coins/markets" and params "target-currency" and "sort-order" */}

					{/*<Tab label="Trending 🔥" {...a11yProps("show_trending")} />*/}
					{/* Fetches coin-IDs based on coinGecko-trending */}
					{/* https://api.coingecko.com/api/v3/search/trending */}
					{/* Coin-IDs need to be mapped against "/coins/markets" to get coin-data*/}

					{/* Sectors */}
					<Tab label="Stablecoins" {...a11yProps("show_stablecoins")} />
					<Tab label="Meme coins" {...a11yProps("show_meme_coins")} />
					<Tab label="NFTs" {...a11yProps("show_nfts")} />
					<Tab label="DEX Tokens" {...a11yProps("show_dex_tokens")} />
					<Tab label="Game Fi" {...a11yProps("show_game_fi")} />
					<Tab label="Music" {...a11yProps("show_music")} />
				</Tabs>
			</Box>
		</Box>
	);
}

export default TabBar
