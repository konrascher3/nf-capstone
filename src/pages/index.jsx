import Head from "next/head";
import React from "react";
import Layout from "../organisms/layout";

import FastMarquee from "/src/molecules/fast-marquee/FastMarquee"

import useGet from "../ions/hooks/fetch/get";

// MUI Imports
import Box from "@mui/material/Box"
import { styled } from "@mui/material/";
import { DataGrid } from "@mui/x-data-grid"

import { formatCurrency } from "@coingecko/cryptoformat";


// Styled components (columns)
const StyledRankColumn = styled("div")({
	position: "absolute",
	inset: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
})

const StyledNameColumn = styled("div")({
	display: "grid",
	gap: 10,
	gridTemplateColumns: "25px 1fr"
})

const columns = [
	{
		field: "market_cap_rank",
		width: 0,
		headerName: "#",
		renderCell: (params) => (
			/* TODO: Decide on bookmark */
			<StyledRankColumn>
				{/* Checkbox */}
				{/*<button style={{position: "absolute", left: 0, top: 0, border: "10px solid", borderColor: "red transparent transparent red" }}>*/}
				{/*</button>*/}
				<span>{params.value}.</span>
			</StyledRankColumn>
		)
	},
	{
		field: "name",
		headerName: "Name",
		minWidth: 100,
		flex: 1,
		renderCell: (params) => (
			<StyledNameColumn>
				<img
					style={{ width: 28, height: 28, alignSelf: "center" }}
					src={`${params.row.image}`}
					alt={`Project-icon of ${params.row.name}`}
				/>
				<div style={{width: "100%", overflow:"hidden",  whiteSpace: "no-wrap"}}>
					<div style={{textOverflow: "ellipsis", overflow: "hidden" }}>
						{params.value}
					</div>
					<div>{params.row.symbol.toUpperCase()}</div>
				</div>
			</StyledNameColumn>
		)
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

const Page = () => {
	const { data, loading, error } = useGet("../api/test-coins");

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}
			{data && (
				<>
					<Box sx={{ m: .75 }}>
						<FastMarquee />
					</Box>
					<Box >
						<DataGrid
							hideFooter
							autoHeight
							rows={data}
							columns={columns}
							loading={loading}
							density="standard"
							headerHeight={35}
							//scrollbarSize={0}
							sx={{".MuiDataGrid-columnSeparator": {
									visibility: "hidden",
								},
							".MuiDataGrid-cell": {
								position: "relative",
								overflow: "visible"
							},
								m: .5,
							}}
						/>
					</Box>
				</>
			)}
		</Layout>
	);
};

export default Page;
