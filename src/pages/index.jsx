import Head from "next/head";
import React from "react";
import Layout from "../organisms/layout";

import useGet from "../ions/hooks/fetch/get";

import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
	{
		field: "market_cap_rank",
		headerName: "Rank",
		renderCell: (params) => (
			<div>
				# {params.value} {console.log(params.value)}
			</div>
		)
	},
	{
		field: "name",
		headerName: "Name",
		renderCell: (params) => (
			<>
				<img
					style={{ width: "25px", paddingRight: "5px" }}
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
		valueFormatter: ({ value }) => `${value} %`,
		renderCell: ({ value }) => (
			<div style={value > 0 ? { color: "green" } : { color: "red" }}>
				{value > 0 ? "+" : ""}
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
				currency: "USD"
			}).format(value)
	},
	{ field: "isFavorited", headerName: "Favorited", type: "boolean" }


];


const Page = () => {
	const { data, loading, error } = useGet("http://0.0.0.0:3000/api/testCoins");

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{data && (
				<Box
					sx={{
						height: 500,
						width: 1
					}}
				>
					<DataGrid
						hideFooter
						rows={data}
						columns={columns}
						loading={loading}
					/>
				</Box>


			)}
		</Layout>

	);
};

export default Page;
