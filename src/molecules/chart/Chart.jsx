import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box"

// Recharts Imports
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

// MUI Imports
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import moment from "moment";

// Custom Imports
import CustomChartPriceTick from "/src/atoms/custom-chart-price-tick/CustomChartPriceTick"
import CustomChartTooltip from "/src/atoms/custom-chart-tooltip/CustomChartTooltip"

import CompleteLogoChart from "/src/ions/img/chart/complete-logo-chart.svg"

import useStore from "/src/ions/hooks/state/useStore"

const Chart = ({ dataArray }) => {

	const loading = useStore((state) => state.loading)

	const setTimeFrame = useStore((state) => state.setTimeFrame);
	const setInterval = useStore((state) => state.setInterval);

	const [alignment, setAlignment] = useState(1);

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment)
	}

	useEffect(()=>{
		setAlignment(7);
		setInterval("daily");
		setTimeFrame(7)
	},[])

	return (
		<Box sx={{ width: "100%", display: "flex", flexDirection: "column", p: .5}}>
			{/*Time-frame component*/}
			<Box sx={{ m: .5, alignSelf: "flex-end" }}>
				<ToggleButtonGroup
					exclusive
					color="primary"
					value={alignment}
					disabled={loading}
					size="small"
					onChange={handleChange}

				>
					<ToggleButton
						variant="outlined"
						value={1}
						onClick={()=>{
							setTimeFrame(1);
							setInterval("hourly")
						}}
					>
						24H
					</ToggleButton>
					<ToggleButton
						variant="outlined"
						value={7}
						onClick={()=>{
							setTimeFrame(7);
							setInterval("daily")
						}}
					>
						7D
					</ToggleButton>
					<ToggleButton
						variant="outlined"
						value={14}
						onClick={()=>{
							setTimeFrame(14);
							setInterval("daily")
						}}
					>
						14D
					</ToggleButton>
					<ToggleButton
						variant="outlined"
						value={30}
						onClick={()=>{
							setTimeFrame(30);
							setInterval("daily")
						}}
					>
						1M
					</ToggleButton>
					<ToggleButton
						variant="outlined"
						value={90}
						onClick={()=>{
							setTimeFrame(90);
							setInterval("daily")
						}}
					>
						3M
					</ToggleButton>
					<ToggleButton
						variant="outlined"
						value={360}
						onClick={()=>{
							setTimeFrame(360);
							setInterval("monthly")
						}}
					>
						1Y
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<ResponsiveContainer width="100%" height={275}>
				<AreaChart type="monotone" stroke="#8884d8" data={dataArray} margin={{ left: -60, top: 20 }}>
					<defs>
						<linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#FF79C6" stopOpacity={1} />
							<stop offset="100%" stopColor="#FF79C6" stopOpacity={0} />
						</linearGradient>
					</defs>

					<Area
						dataKey="price"
						stroke="#FF79C6"
						fill="url(#color)"
					/>

					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tick={false}
						tickCount={7}
						domain={["auto", "auto"]}
						tickFormatter={(date) => moment.utc(date).format("MMM Do ")}
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
					<Tooltip content={<CustomChartTooltip />}/>
					<CartesianGrid opacity={0.5} vertical={false} strokeDasharray="3 3"/>
				</AreaChart>
			</ResponsiveContainer>
			<img
				src={CompleteLogoChart.src}
				alt="Coin ghost logo"
				style={{
					height: 20,
					alignSelf: "flex-end",
					position: "relative",
					top: -55,
					right: 7
				}}
			/>
		</Box>
	)
}

export default Chart
