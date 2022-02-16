import React, { useEffect, useState } from "react";

// MUI Imports
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const ToggleTimeframeComponent = () => {
	const loading = useStore(state => state.loading);

	const setTimeFrame = useStore(state => state.setTimeFrame);
	const setInterval = useStore(state => state.setInterval);

	const [alignment, setAlignment] = useState(1);

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	useEffect(() => {
		setAlignment(7);
		setInterval("daily");
		setTimeFrame(7);
	}, [setInterval, setTimeFrame]);

	return (
		<Box
			sx={{
				position: "relative",
				// top: -40,
				m: 0.5,
				alignSelf: "flex-end",
			}}
		>
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
					onClick={() => {
						setTimeFrame(1);
						setInterval("hourly");
					}}
				>
					24H
				</ToggleButton>
				<ToggleButton
					variant="outlined"
					value={7}
					onClick={() => {
						setTimeFrame(7);
						setInterval("daily");
					}}
				>
					7D
				</ToggleButton>
				<ToggleButton
					variant="outlined"
					value={14}
					onClick={() => {
						setTimeFrame(14);
						setInterval("daily");
					}}
				>
					14D
				</ToggleButton>
				<ToggleButton
					variant="outlined"
					value={30}
					onClick={() => {
						setTimeFrame(30);
						setInterval("daily");
					}}
				>
					1M
				</ToggleButton>
				<ToggleButton
					variant="outlined"
					value={90}
					onClick={() => {
						setTimeFrame(90);
						setInterval("daily");
					}}
				>
					3M
				</ToggleButton>
				<ToggleButton
					variant="outlined"
					value={360}
					onClick={() => {
						setTimeFrame(360);
						setInterval("monthly");
					}}
				>
					1Y
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
};

export default ToggleTimeframeComponent;
