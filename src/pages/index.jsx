import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "../organisms/layout";

import useGet from "../ions/hooks/fetch/get";

import { DataGrid } from "@mui/x-data-grid"


const Page = () => {
	const { data, loading, error } = useGet("http://0.0.0.0:3000/api/testCoins");

	useEffect(()=>{
		fetch("/src/pages/api/test-coins")
			.then(response => console.log(response))

	},[])
	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
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
