import Head from "next/head";
import React from "react";
import Layout from "/src/organisms/layout/index";
import useGet from "/src/ions/hooks/fetch/get";

import { useRouter } from "next/router"

const Page = () => {
	const router = useRouter();
	const { slug } = router.query

	// Get chart-data (14 days)
	const { data, loading, error } = useGet(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=14&interval=daily`);

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			<h2>I am a detail-page of {slug}!</h2>
			<h5>This is the historical market data for the 14-day-chart:</h5>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{data && (
				<pre>
					<code>{JSON.stringify(data, null, 4)}</code>
				</pre>
			)}
		</Layout>
	);
};

export default Page;
