import { styled } from "@mui/material";
import Head from "next/head";
import React from "react";
import Layout from "../organisms/layout";

import useGet from "../ions/hooks/fetch/get";

import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"

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
			<>
				<img
					style={{ width: 25, paddingRight: 5 }}
					src={`${params.row.image}`}
					alt={`Project-icon of ${params.row.name}`}
				/>
				<div>
					{params.value}
					<div>{params.row.symbol.toUpperCase()}</div>
				</div>
			</>
		)
	},
	{
		field: "price_change_percentage_24h",
		headerName: "24h",
		width: 70,
		valueFormatter: ({ value }) => `${value} %`,
		renderCell: ({ value }) => (
			<div style={value > 0 ? { color: "green" } : { color: "red" }}>
				{value.toFixed(2)} %
			</div>
		)
	},
	{
		field: "current_price",
		headerName: "Price",
		valueFormatter: ({ value }) =>
			new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				currencyDisplay: "narrowSymbol",
				maximumSignificantDigits: 2
			}).format(value)
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
