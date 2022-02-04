import Box from "@mui/material/Box";
import Head from "next/head";
import React, {useEffect} from "react";
import Layout from "/src/organisms/layout/index";

// useStore
import useStore from "/src/ions/hooks/state/useStore"
import LoadMoreButton from "../../atoms/loadMoreButton/LoadMoreButton";
import CoinsDataGrid from "../../molecules/coins-data-grid/DataGrid";
import FastMarquee from "../../molecules/fast-marquee/FastMarquee";
import Drawer from "../../organisms/drawer/Drawer";


const Page = () => {
	const { coins, loading, error, setOpen } = useStore((state) => state);

	useEffect(()=>{setOpen(false)}, [])

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{coins && (
				<div>
					{/*Drawer component*/}
					<Drawer />

					{/*Marquee component*/}
					<Box sx={{ m: .75 }}>
						<FastMarquee />
					</Box>

					{/*Data-grid component*/}
					<Box >
						<CoinsDataGrid />
					</Box>

					{/*Load-More-Button component*/}
					<Box sx={{ m: .75, display: "flex", justifyContent: "center" }}>
						<LoadMoreButton />
					</Box>
				</div>
			)}
		</Layout>
	);
};

export default Page;
