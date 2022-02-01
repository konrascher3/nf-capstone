import Head from "next/head";
import React from "react";
import Layout from "../organisms/layout";

import useGet from "../ions/hooks/fetch/get";

import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"

import { formatCurrency } from "@coingecko/cryptoformat";

const columns = [
	{
		field: "market_cap_rank",
		width: 50,
		headerName: "#",
		renderCell: (params) => (
			<div>
				# {params.value}
			</div>
		)
	},
	{
		field: "name",
		headerName: "Name",
		minWidth: 130,
		renderCell: (params) => (
			<div style={{display: "grid", gap: 10, gridTemplateColumns: "25px 1fr"}}>
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
			</div>
		)
	},
	{
		field: "price_change_percentage_24h",
		headerName: "24h",
		width: 70,
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
		valueFormatter: ({ value }) =>
			formatCurrency(value, "USD", "en", false)
	},
];

const Page = () => {
	const { data, loading, error } = useGet("http://0.0.0.0:3000/api/testCoins");

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{error && <div>{error.message}</div>}
			{data && (
				<Box
					sx={{
						height: 1000,
						width: 1
					}}
				>
					<DataGrid
						hideFooter
						rows={data}
						columns={columns}
						loading={loading}
						density="standard"
						GridLinesVisibility="None"
						sx={{".MuiDataGrid-columnSeparator": {
								visibility: "hidden",
							},
							m: .5}}
					/>
				</Box>
			)}
		</Layout>
	);
};

export default Page;
