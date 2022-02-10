import axios from "axios";
import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "/src/organisms/layout/index";

// useState
import useStore from "/src/ions/hooks/state/useStore";

// MUI Imports
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

import {v4 as uuid} from "uuid"

import NewsCard from "/src/organisms/news-card/NewsCard"


const Page = () => {
	const loading  = useStore((state) => state.loading)
	const error  = useStore((state) => state.error)
	const setLoading  = useStore((state) => state.setLoading)
	const articles = useStore((state) => state.articles)
	const setArticles = useStore((state) => state.setArticles)

	useEffect(()=>{
		setLoading(true)
		axios.get("/api/newsapi/v2/everything?q=(crypto OR cryptocurrency OR cryptocurrencies)&sortBy=publishedAt&pageSize=100&language=en").then(function (response) {
			setArticles(response.data.data.articles)
		}).catch(function (error) {
			console.error(error);
		});
		setLoading(false)
	},[])



	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{articles && (
				<Box sx={{ m: 2 }}>
					<Stack spacing={2}>
						{articles.map(article => {
							return (
								// TODO: put borderRadius in theme
								// TODO: remove duplicates by title
								// TODO: fix no-wrap
								<NewsCard key={uuid()} article={article} />
							)
						})}
					</Stack>
				</Box>
			)}
		</Layout>
	);
};

export default Page;
