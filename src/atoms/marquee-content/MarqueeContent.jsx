import Box from "@mui/material/Box";
import React from "react";

import Typography from "@mui/material/Typography";
import useGet from "../../ions/hooks/fetch/get";

import useStore from "/src/ions/hooks/state/useStore";
import useColorMode from "/src/ions/hooks/state/useColorMode";

import { darkMode, lightMode } from "/src/ions/theme/theme";

const marqueeContent = () => {
	const colorMode = useColorMode(state => state.colorMode);

	const variant = "subtitle1";
	const { data, loading, error } = useGet("../api/fetch-globals");
	return (
		<>
			{loading ?? <Typography variant={variant}>loading...</Typography>}
			{error && <Typography variant={variant}>{error.message}</Typography>}
			{data && (
				<>
					<Typography variant={variant}>{`Coins: ${data.Coins.toString()}`}</Typography>
					<Typography variant={variant}>
						<Box sx={{ ml: 0.75, mr: 0.75 }}>
							<Typography variant={variant} color="text.secondary">
								•
							</Typography>
						</Box>
					</Typography>
					<Typography variant={variant}>
						{`Exchanges: ${data.Exchanges.toString()}`}
					</Typography>
					<Typography variant="caption">
						<Box sx={{ ml: 0.75, mr: 0.75 }}>
							<Typography variant={variant} color="text.secondary">
								•
							</Typography>
						</Box>
					</Typography>
					<Typography variant={variant}>
						{`Dominance: BTC ${data.dominance.BTC.toString()}% ETH: ${data.dominance.ETH.toString()}%`}
					</Typography>
					<Typography variant={variant}>
						<Box sx={{ ml: 0.75, mr: 0.75 }}>
							<Typography variant={variant} color="text.secondary">
								•
							</Typography>
						</Box>
					</Typography>
					<Typography variant={variant}>
						{`Total Mcap: ${new Intl.NumberFormat("en-US", {
							notation: "compact",
							style: "currency",
							currency: "USD",
						}).format(data["Market Cap"][0].toString())}`}
					</Typography>
					<Box sx={{ ml: 0.5 }}></Box>
					<Typography variant={variant}>
						(
						<span
							style={
								data["Market Cap"][1] > 0
									? {
											color: colorMode
												? darkMode.palette.success.main
												: lightMode.palette.success.main,
									  }
									: {
											color: colorMode
												? darkMode.palette.error.main
												: lightMode.palette.error.main,
									  }
							}
						>
							{data["Market Cap"][1].toString()}%
						</span>
						)
					</Typography>
					<Typography variant={variant}>
						<Box sx={{ ml: 0.75, mr: 0.75 }}>
							<Typography variant={variant} color="text.secondary">
								•
							</Typography>
						</Box>
					</Typography>
					<Typography variant={variant}>
						{`24h Vol: ${new Intl.NumberFormat("en-US", {
							notation: "compact",
							style: "currency",
							currency: "USD",
						}).format(data["24h Vol"].toString())}`}
					</Typography>
					<Typography variant={variant}>
						<Box sx={{ ml: 0.75, mr: 0.75 }}>
							<Typography variant={variant} color="text.secondary">
								•
							</Typography>
						</Box>
					</Typography>
				</>
			)}
		</>
	);
};

export default marqueeContent;
