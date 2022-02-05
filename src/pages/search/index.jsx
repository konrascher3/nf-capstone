import Head from "next/head";
import React from "react";

import Layout from "/src/organisms/layout/index";

// MUI Import
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore"



const Page = () => {
	const { loading, error } = useStore((state) => state);
	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			<div>
				<Box>I am a search-box</Box>
			</div>
		</Layout>
	);
};

export default Page;
