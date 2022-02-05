import Box from "@mui/material/Box";
import Head from "next/head";
import React from "react";
import Layout from "/src/organisms/layout/index";

// useStore
import useStore from "/src/ions/hooks/state/useStore"

// Import meme
import meme from "/src/ions/img/memes/jurassic-park.webp"


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
				<Box sx={{ display: "flex", m: 5, alignItems: "center", justifyContent: "center" }}>
					<img src={meme.src} alt="Ah ah ah! You didn't say the magic word!"/>
				</Box>
			</div>
		</Layout>
	);
};

export default Page;
