import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "/src/organisms/layout/index";

// useState
import useStore from "/src/ions/hooks/state/useStore";

// MUI Imports
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

import NewsCard from "/src/organisms/news-card/NewsCard"

// import "dotenv/config"
// require('dotenv').config()

const Page = () => {
	const loading  = useStore((state) => state.loading)
	const error  = useStore((state) => state.error)
	const setLoading  = useStore((state) => state.setLoading)
	const articles = useStore((state) => state.articles)
	const setArticles = useStore((state) => state.setArticles)

	const axios = require("axios").default;

	const options = {
		method: "GET",
		url: "https://free-news.p.rapidapi.com/v1/search",
		params: {q: "Crypto,Cryptocurrency", lang: 'en'},
		headers: {
			"x-rapidapi-host": "free-news.p.rapidapi.com",
			"x-rapidapi-key": process.env.X_RAPIDAPI_KEY
		}
	};

	useEffect(()=>{
		setLoading(true)
		axios.request(options).then(function (response) {
			setArticles(response.data.articles)
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
								<NewsCard key={article.id} article={article} />
							)
						})}
					</Stack>
				</Box>
			)}
		</Layout>
	);
};

export default Page;
