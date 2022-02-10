import React, { useEffect, useState } from "react";

import { formatCurrency } from "@coingecko/cryptoformat";

// MUI Imports

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// useStore
import useStore from "/src/ions/hooks/state/useStore";


const MacroDataTable = () => {
	const detailData = useStore((state) => state.detailData);
	const [macroRows, setMacroRows] = useState(null);

	// Table-data
	const createData = (kpi, value) => {
		return {kpi, value}
	}

	useEffect(()=>{
		const macroRows = [
			createData("Market Cap Rank", detailData.market_data.market_cap_rank),
			createData("Market Cap",
				new Intl.NumberFormat("en-US",
					{
						notation: "standard",
						style: 'currency',
						currency: 'USD',
						compactDisplay: "long",
						minimumSignificantDigits: 1
					}).format(detailData.market_data.market_cap.usd)),
			createData("Market Cap Change", `${parseFloat(detailData.market_data.market_cap_change_percentage_24h_in_currency.usd).toFixed(2)}%`),
			createData("Total Volume 24h", new Intl.NumberFormat("en-US",
				{
					notation: "standard",
					style: 'currency',
					currency: 'USD',
					compactDisplay: "long",
					minimumSignificantDigits: 1
				}).format(detailData.market_data.total_volume.usd)),
			createData("24h High", formatCurrency(detailData.market_data.high_24h.usd, "USD", "en", false)),
			createData("24h Low", formatCurrency(detailData.market_data.low_24h.usd, "USD", "en", false)),
			createData("All-Time-High", formatCurrency(detailData.market_data.ath.usd, "USD", "en", false)),
			createData("All-Time-Low", formatCurrency(detailData.market_data.atl.usd, "USD", "en", false)),
			createData("Max. Supply", detailData.market_data.max_supply === null
					? "none"
					: new Intl.NumberFormat("en-US").format(detailData.market_data.max_supply.toFixed())
			),
			createData("Circulating Supply", new Intl.NumberFormat("en-US").format(detailData.market_data.circulating_supply.toFixed()))
		]
		setMacroRows(macroRows)
	}, [detailData?.name])

	return (
		<>
			{detailData && (
				<Card sx={{
				mx: .75,
				p: 1,
				position: "relative" }}
				>
					<TableContainer>
						<Table size="medium" aria-label={`Tokenomics of ${detailData.name}`}>
							<TableBody>
								{macroRows?.map((macroRow) => (
									<TableRow
										key={macroRow.value}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{macroRow.kpi}
										</TableCell>
										<TableCell align="right">{macroRow.value}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Card>)}
		</>
	)
}

export default MacroDataTable
