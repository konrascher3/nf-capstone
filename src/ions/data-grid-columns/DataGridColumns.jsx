import { useRouter } from "next/router";
import React from "react";

import { formatCurrency } from "@coingecko/cryptoformat";

// Styled-components Import
import { StyledRankColumn, StyledNameColumn } from "/src/ions/data-grid-columns/styled";

// Custom-components Imports
import CustomCheckbox from "/src/atoms/custom-checkbox/CustomCheckbox";
import useStore from "/src/ions/hooks/state/useStore";

// MUI Import
import Typography from "@mui/material/Typography";

import theme from "/src/ions/theme/theme";

const variant = "body1";

const DataGridColumns = [
	{
		field: "market_cap_rank",
		width: 0,
		headerName: "#",
		renderCell: params => {
			const loggedIn = useStore(state => state.loggedIn);

			return (
				/* TODO: Decide on bookmark */
				<StyledRankColumn style={{ position: "relative" }}>
					{loggedIn ? <CustomCheckbox params={params} /> : ""}
					<span>
						<Typography variant={variant}>
							{params.value ? `${params.value}.` : "-"}
						</Typography>
					</span>
				</StyledRankColumn>
			);
		},
	},
	{
		field: "name",
		headerName: "Name",
		minWidth: 100,
		flex: 1,
		renderCell: params => {
			const router = useRouter();
			return (
				<label
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
				>
					<input
						type="button"
						style={{ position: "fixed", top: "-100%", left: "-100vw" }}
						onClick={() => {
							router.push(`/detail/${params.id}`);
						}}
					/>
					<StyledNameColumn>
						<img
							style={{ width: 28, height: 28, alignSelf: "center" }}
							src={`${params.row.image}`}
							alt={`Project-icon of ${params.row.name}`}
						/>
						<div
							style={{
								width: "100%",
								overflow: "hidden",
								whiteSpace: "no-wrap",
							}}
						>
							<div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
								<Typography variant={variant}>{params.value}</Typography>
							</div>
							<div>
								<Typography variant="button">
									{params.row.symbol.toUpperCase()}
								</Typography>
							</div>
						</div>
					</StyledNameColumn>
				</label>
			);
		},
	},
	{
		field: "price_change_percentage_24h",
		headerName: "24h",
		flex: 1,
		renderCell: ({ value }) => {
			return (
				<div
					style={
						value > 0
							? { color: theme.palette.success.main }
							: { color: theme.palette.error.main }
					}
				>
					<Typography variant={variant}>{`${parseFloat(value).toFixed(2)}%`}</Typography>
				</div>
			);
		},
	},
	{
		field: "current_price",
		headerName: "Price",
		width: 110,
		renderCell: ({ value }) => {
			return (
				<Typography variant={variant}>
					{formatCurrency(value, "USD", "en", false)}
				</Typography>
			);
		},
	},
];

export default DataGridColumns;
