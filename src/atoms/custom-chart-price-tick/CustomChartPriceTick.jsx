import { formatCurrency } from "@coingecko/cryptoformat";
import Typography from "@mui/material/Typography";
import React from "react";


const CustomChartPriceTick = ({ x, y, payload, height, width, ...props }) => {
	return (
		<foreignObject x={x + 52} y={y - 20} height={height} width={width + width} {...props}>
			<Typography
				variant="subtitle2"
				component="p"
				color="text.secondary"
				xmlns="http://www.w3.org/1999/xhtml"
			>
				{`${formatCurrency(payload.value, "USD", "en", false)}`}
			</Typography>
		</foreignObject>
	)
}

export default CustomChartPriceTick
