import Box from "@mui/material/Box";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "/src/organisms/layout/index";
import useGet from "/src/ions/hooks/fetch/get";

import { useRouter } from "next/router"
import useStore from "../../ions/hooks/state/useStore";
import FastMarquee from "../../molecules/fast-marquee/FastMarquee";

import Chart from "/src/molecules/chart/Chart"

const Page = () => {

	const setTimeFrame = useStore((state) => state.setTimeFrame);
	const setInterval = useStore((state) => state.setInterval);
	const timeFrame = useStore((state) => state.timeFrame);
	const interval = useStore((state) => state.interval);

	const router = useRouter();
	const { slug } = router.query
	const { data, error } = useGet(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=${timeFrame}&interval=${interval}`);

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


	// Initialize toggle-button group
	useEffect(()=>{
		setTimeFrame(7);
		setInterval("daily")
	},[setInterval, setTimeFrame])

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

			{error && <div>{error.message}</div>}
			{dataArray && (
				<>
					<h5>Price chart for {slug}</h5>

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
