import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { formatCurrency } from "@coingecko/cryptoformat";

import moment from "moment";

import useStore from "/src/ions/hooks/state/useStore";
import { darkMode, lightMode } from "/src/ions/theme/theme";

const CustomChartTooltip = ({ active, payload, label }) => {
	const interval = useStore(state => state.interval);
	const colorMode = useStore(state => state.colorMode);

	if (active) {
		return (
			<Box
				sx={{
					borderRadius: 0.75,
					backgroundColor: colorMode
						? darkMode.palette.background.paper
						: lightMode.palette.background.paper,
					p: 1,
					textAlign: "center",
				}}
			>
				<Typography variant="body1">
					{interval === "hourly"
						? moment.utc(label).format("MMM Do, h:mm a")
						: interval === "monthly"
						? moment.utc(label).format("ll")
						: moment.utc(label).format("MMM Do")}
				</Typography>
				<Typography variant="body2">
					{payload ? formatCurrency(payload[0].payload.price, "USD", "en", false) : ""}
				</Typography>
			</Box>
		);
	}
	return null;
};

export default CustomChartTooltip;
