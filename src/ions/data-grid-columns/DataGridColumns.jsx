import { useRouter } from "next/router";
import React from "react";

import { formatCurrency } from "@coingecko/cryptoformat";

// Styled-components Import
import {StyledRankColumn, StyledNameColumn} from "/src/ions/data-grid-columns/styled"

// Custom-components Imports
import CustomCheckbox from "/src/atoms/custom-checkbox/CustomCheckbox"


const DataGridColumns = [
	{
		field: "market_cap_rank",
		width: 0,
		headerName: "#",
		renderCell: (params) => {
			return (
				/* TODO: Decide on bookmark */
				<StyledRankColumn style={{ position: "relative" }}>
					<CustomCheckbox params={params} />
					<span>{params.value}.</span>
				</StyledRankColumn>
			)}
	},
	{
		field: "name",
		headerName: "Name",
		minWidth: 100,
		flex: 1,
		renderCell: (params) => {
			const router = useRouter();
			return (
				<label style={{
					border: "1px solid green",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center"
				}}
				>
					<input
						type="button"
						style={{ position: "fixed", top: "-100%", left: "-100vw" }}
						onClick={() => {
							router.push(`/detail/${params.id}`)
						}}
					/>
					<StyledNameColumn>
						<img
							style={{ width: 28, height: 28, alignSelf: "center" }}
							src={`${params.row.image}`}
							alt={`Project-icon of ${params.row.name}`}
						/>
						<div style={{ width: "100%", overflow: "hidden", whiteSpace: "no-wrap" }}>
							<div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
								{params.value}
							</div>
							<div>{params.row.symbol.toUpperCase()}</div>
						</div>
					</StyledNameColumn>
				</label>
)}
	},
	{
		field: "price_change_percentage_24h",
		headerName: "24h",
		flex: 1,
		renderCell: ({ value }) => {
			const decimals = 0.0001;
			return (
				<div style={value > 0 ? { color: "green" } : { color: "red" }}>
					{new Intl.NumberFormat("en-US", {
						style: "percent",
						maximumSignificantDigits: 5
					}).format(Math.round(value / 1000 / decimals) * decimals)}
				</div>
			);
		}
	},
	{
		field: "current_price",
		headerName: "Price",
		width: 110,
		valueFormatter: ({ value }) =>
			formatCurrency(value, "USD", "en", false)
	},
];

export default DataGridColumns;
