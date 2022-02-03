import Box from "@mui/material/Box";
import React from "react";
import useStore from "../../ions/hooks/state/useStore";

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

	const endpoints = {
		topCoins: "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
		stableCoins: "coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&sparkline=false",
		memeCoins: "coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&sparkline=false",
		nftCoins: "coins/markets?vs_currency=usd&category=non-fungible-tokens-nft&order=market_cap_desc&sparkline=false",
		dexCoins: "coins/markets?vs_currency=usd&category=decentralized-exchange&order=market_cap_desc&sparkline=false",
		gameCoins: "coins/markets?vs_currency=usd&category=gaming&order=market_cap_desc&sparkline=false",
		musicCoins: "coins/markets?vs_currency=usd&category=music&order=market_cap_desc&sparkline=false"
	}

	const [value, setValue] = React.useState(0);
	const {fetchData, loading} = useStore((state) => state)

	const handleChange = (event, newValue) => {
		setValue(newValue);
		switch (newValue) {
			case 0:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.topCoins}`)
				break
			case 1:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.stableCoins}`)
				break
			case 2:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.memeCoins}`)
				break
			case 3:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.nftCoins}`)
				break
			case 4:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.dexCoins}`)
				break
			case 5:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.gameCoins}`)
				break
			case 6:
				fetchData(`https://api.coingecko.com/api/v3/${endpoints.musicCoins}`)
				break
		}
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
					<Tab disabled={loading} label="Top Coins 👑" {...a11yProps("show_top_coins")} />

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
