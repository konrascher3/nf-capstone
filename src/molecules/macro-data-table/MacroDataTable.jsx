import React, { useEffect, useState } from "react";

import { formatCurrency } from "@coingecko/cryptoformat";

// MUI Imports

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const MacroDataTable = () => {
	const detailData = useStore(state => state.detailData);
	const [macroRows, setMacroRows] = useState(null);

	// Table-data
	const createData = (kpi, value) => {
		return { kpi, value };
	};

	useEffect(() => {
		const macroRows = [
			createData(
				"Market Cap Rank",
				detailData.market_data.market_cap_rank
					? detailData.market_data.market_cap_rank
					: "Not ranked"
			),
			createData(
				"Market Cap",
				detailData.market_data.market_cap.usd > 0
					? new Intl.NumberFormat("en-US", {
							notation: "standard",
							style: "currency",
							currency: "USD",
							compactDisplay: "long",
							minimumSignificantDigits: 1,
					  }).format(detailData.market_data.market_cap.usd)
					: "Not available"
			),
			createData(
				"Market Cap Change",
				detailData.market_data.market_cap_change_percentage_24h_in_currency.usd
					? `${parseFloat(
							detailData.market_data.market_cap_change_percentage_24h_in_currency.usd
					  ).toFixed(2)}%`
					: "Not available"
			),
			createData(
				"Total Volume 24h",
				detailData.market_data.total_volume.usd
					? new Intl.NumberFormat("en-US", {
							notation: "standard",
							style: "currency",
							currency: "USD",
							compactDisplay: "long",
							minimumSignificantDigits: 1,
					  }).format(detailData.market_data.total_volume.usd)
					: "Not available"
			),
			createData(
				"24h High",
				detailData.market_data.high_24h.usd
					? formatCurrency(detailData.market_data.high_24h.usd, "USD", "en", false)
					: "Not available"
			),
			createData(
				"24h Low",
				detailData.market_data.low_24h.usd
					? formatCurrency(detailData.market_data.low_24h.usd, "USD", "en", false)
					: "Not available"
			),
			createData(
				"All-Time-High",
				detailData.market_data.ath.usd
					? formatCurrency(detailData.market_data.ath.usd, "USD", "en", false)
					: "Not available"
			),
			createData(
				"All-Time-Low",
				detailData.market_data.atl.usd
					? formatCurrency(detailData.market_data.atl.usd, "USD", "en", false)
					: "Not available"
			),
			createData(
				"Max. Supply",
				detailData.market_data.max_supply === null
					? "Not available"
					: detailData.market_data.max_supply <= 0
					? "Uncapped supply"
					: new Intl.NumberFormat("en-US").format(
							detailData.market_data.max_supply.toFixed()
					  )
			),
			createData(
				"Circulating Supply",
				detailData.market_data.circulating_supply === null ||
					detailData.market_data.circulating_supply <= 0
					? "Not available"
					: new Intl.NumberFormat("en-US").format(
							detailData.market_data.circulating_supply.toFixed()
					  )
			),
		];
		setMacroRows(macroRows);
	}, [detailData?.name]);

	const variant = "body1";

	return (
		<>
			{detailData && (
				<Card
					sx={{
						p: 1,
						position: "relative",
					}}
				>
					<TableContainer>
						<Table size="medium" aria-label={`Tokenomics of ${detailData.name}`}>
							<TableBody>
								{macroRows?.map(macroRow => (
									<TableRow
										key={macroRow.value}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											<Typography variant={variant}>
												{macroRow.kpi}
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography variant={variant}>
												{macroRow.value}
											</Typography>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Card>
			)}
		</>
	);
};

export default MacroDataTable;
