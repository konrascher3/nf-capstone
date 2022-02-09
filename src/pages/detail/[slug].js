import Box from "@mui/material/Box";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "/src/organisms/layout/index";
import useGet from "/src/ions/hooks/fetch/get";

import { useRouter } from "next/router"
import FastMarquee from "../../molecules/fast-marquee/FastMarquee";

import Chart from "/src/molecules/chart/Chart"

const Page = () => {
	const router = useRouter();
	const { slug } = router.query
	const { data, loading, error } = useGet(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=14&interval=daily`);

	const [dataArray, setDataArray] = useState(null)

	useEffect(()=>{
		const mappedPriceArray = [];
		data?.prices.map((price) => {
			let priceOb = {
				"date": price[0],
				"price": price[1]
			}
			mappedPriceArray.push(priceOb)
		})
		setDataArray(mappedPriceArray)
	}, [data])

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>

			{/*Marquee component*/}
			<Box sx={{ m: .75 }}>
				<FastMarquee />
			</Box>

			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{dataArray && (
				<>
					<h5>Price chart for {slug}</h5>
					{/* TODO: Change header-data based on tooltip-payload-change (tooltip) */}
					{/*Chart component*/}
					<Box>
						<Chart dataArray={dataArray} />
					</Box>
				</>
			)}
		</Layout>
	);
};
export default Page;
