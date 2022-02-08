import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { formatCurrency } from "@coingecko/cryptoformat";

import moment from "moment";


const CustomChartTooltip = ({active, payload, label}) => {
	if (active) {
		return (
			<Box sx={{
				borderRadius: .75,
				backgroundColor: "white",
				p: 1,
				textAlign: "center"
			}}
			>
				{/* TODO: Add data-formatting based on selected timeframe */}
				<Typography variant="body2">{moment.utc(label).format("MMM Do")}</Typography>
				<Typography variant="caption">{ payload ? formatCurrency(payload[0].payload.price, "USD", "en", false) : ""}</Typography>
			</Box>
		)
	}
	return null;
}

export default CustomChartTooltip
