import Head from "next/head";
import React from "react";

import Layout from "/src/organisms/layout/index";

// MUI Import
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

// Import meme
import meme from "/src/ions/img/memes/jurassic-park.gif";

const Page = () => {
	const error = useStore(state => state.error);
	const loading = useStore(state => state.loading);

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			<div>
				<Box sx={{ display: "flex", m: 5, alignItems: "center", justifyContent: "center" }}>
					<img src={meme.src} alt="Ah ah ah! You didn't say the magic word!" />
				</Box>
			</div>
		</Layout>
	);
};

export default Page;
