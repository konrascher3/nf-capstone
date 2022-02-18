import React from "react";

// MUI Import
import Typography from "@mui/material/Typography";

// Custom-components Imports
import LottieTumbleweed from "/src/atoms/lottie-tumbleweed/LottieTumbleweed";
import theme from "/src/ions/theme/theme";

const EmptyWatchlistComponent = () => {
	return (
		<>
			<LottieTumbleweed />
			<Typography
				variant="h4"
				color={theme.palette.text.primary}
				sx={{ textAlign: "center", margin: "0 auto" }}
				maxWidth={200}
			>
				It looks kinda empty here...
			</Typography>
		</>
	);
};

export default EmptyWatchlistComponent;
