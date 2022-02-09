import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { formatCurrency } from "@coingecko/cryptoformat";

import moment from "moment";

import useState from "/src/ions/hooks/state/useStore"


const CustomChartTooltip = ({active, payload, label}) => {
	const interval = useState((state) => state.interval)

	if (active) {
		return (
			<Box sx={{
				borderRadius: .75,
				backgroundColor: "white",
				p: 1,
				textAlign: "center"
			}}
			>
				<Typography
					variant="body2"
				>
					{interval === "hourly" ? moment.utc(label).format("MMM Do, h:mm a")
						: interval === "monthly" ? moment.utc(label).format("ll")
							: moment.utc(label).format("MMM Do")}
				</Typography>
				<Typography variant="caption">
					{ payload ? formatCurrency(payload[0].payload.price, "USD", "en", false) : ""}
				</Typography>
			</Box>
		)
	}
	return null;
}

export default CustomChartTooltip
