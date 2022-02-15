import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// MUI Import
import Box from "@mui/material/Box";

// Recharts Imports
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import moment from "moment";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

// Custom Imports
import CustomChartPriceTick from "/src/atoms/custom-chart-price-tick/CustomChartPriceTick";
import CustomChartTooltip from "/src/atoms/custom-chart-tooltip/CustomChartTooltip";
import ToggleTimeframeComponent from "/src/molecules/toggle-timeframe-component/ToggleTimeframeComponent";

import CompleteLogoChart from "/src/ions/img/chart/complete-logo-chart.svg";

import useGet from "/src/ions/hooks/fetch/get";

const Chart = () => {
	const router = useRouter();
	const { slug } = router.query;
	const timeFrame = useStore(state => state.timeFrame);
	const interval = useStore(state => state.interval);
	const { data, error } = useGet(
		`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=${timeFrame}&interval=${interval}`
	);

	const [dataArray, setDataArray] = useState(null);

	useEffect(() => {
		const mappedPriceArray = [];
		data?.prices.map(price => {
			let priceOb = {
				date: price[0],
				price: price[1],
			};
			mappedPriceArray.push(priceOb);
		});
		setDataArray(mappedPriceArray);
	}, [data]);
	return (
		<>
			{error && <div>Chart: {error.message}</div>}
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				{dataArray && (
					<>
						{/*Toggle-Timeframe component*/}
						<ToggleTimeframeComponent />
						<ResponsiveContainer width="100%" height={275}>
							<AreaChart
								type="monotone"
								stroke="#8884d8"
								data={dataArray}
								margin={{
									left: -60,
									top: 20,
								}}
							>
								<defs>
									<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#FF79C6" stopOpacity={1} />
										<stop offset="100%" stopColor="#FF79C6" stopOpacity={0} />
									</linearGradient>
								</defs>
								<Area dataKey="price" stroke="#FF79C6" fill="url(#color)" />
								<XAxis
									dataKey="date"
									axisLine={false}
									tickLine={false}
									tick={false}
									tickCount={7}
									domain={["auto", "auto"]}
									tickFormatter={date => moment.utc(date).format("MMM Do ")}
								/>
								<YAxis
									mirror
									interval="1"
									dataKey="price"
									axisLine={false}
									tickLine={false}
									tickCount={5}
									domain={["auto", "auto"]}
									tick={<CustomChartPriceTick />}
								/>
								<Tooltip content={<CustomChartTooltip />} />
								<CartesianGrid
									opacity={0.5}
									vertical={false}
									strokeDasharray="3 3"
								/>
							</AreaChart>
						</ResponsiveContainer>
						<img
							src={CompleteLogoChart.src}
							alt="Coin ghost logo"
							style={{
								height: 25,
								alignSelf: "flex-end",
								position: "relative",
								top: -57,
								right: 5,
							}}
						/>
					</>
				)}
			</Box>
		</>
	);
};

export default Chart;
