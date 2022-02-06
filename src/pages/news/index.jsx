import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "/src/organisms/layout/index";

// useState
import useStore from "/src/ions/hooks/state/useStore";

// MUI Imports
import Stack from "@mui/material/Stack"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from "@mui/material/Box"

// Time ago
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)


const Page = () => {
	const loading  = useStore((state) => state.loading)
	const error  = useStore((state) => state.error)
	const setLoading  = useStore((state) => state.setLoading)
	const [articles, setArticles] = useState(null)

	const axios = require("axios").default;

	const options = {
		method: 'GET',
		url: 'https://free-news.p.rapidapi.com/v1/search',
		params: {q: 'Crypto,Cryptocurrency', lang: 'en'},
		headers: {
			'x-rapidapi-host': 'free-news.p.rapidapi.com',
			'x-rapidapi-key': 'ea63b3156dmsh6da329c497ccafap175621jsn97465587449c'
		}
	};

	useEffect(()=>{
		setLoading(true)
		axios.request(options).then(function (response) {
			console.log(response.data.articles);
			setArticles(response.data.articles)
		}).catch(function (error) {
			console.error(error);
		});
		setLoading(false)
	},[])

	return (
		<Layout>
			<Head>
				<title key="title">My Project</title>
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
								<Card key={article._id} sx={{ borderRadius: 4.5 }} elevation={2}>
									<CardActionArea href={article.link} target="_blank">
										<CardContent sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "start",
											// border: "1px solid red",
											gap: .5,
											height: 120 }}
										>
											<Box sx={{display: "flex",
												// border: "1px solid pink"
											}}
											>
												<CardMedia
													sx={{
														border: "1px solid #D3D3D366",
														height: 75,
														width: 75,
														borderRadius: 2 }}
													component="img"
													image={article.media}
													alt={article.title}
												/>
												<Box sx={{
												pl: 1,
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
												width: "100%",
												overflow:"hidden",
												whiteSpace: "wrap",
												// border: "1px solid black",
												}}
												>
													<Box sx={{
														width: "100%",
														overflow:"hidden",
														whiteSpace: "wrap",
														maxHeight: 40
													}}
													>
														<Typography
															variant="subtitle2"
															color="text.primary"
															sx={{
																// border: "1px solid green",
																textOverflow: "ellipsis",
																overflow: "hidden",
																textTransform: "capitalize"}}
														>
															{article.title.toLowerCase()}
														</Typography>
													</Box>
													<Box sx={{
														// border: "1px solid orange",
														display: "flex",
														m: 0
														// justifyContent: "space-between",
													}}
													>
														<Typography
															variant="caption"
															color="text.secondary"
															sx={{ textTransform: "capitalize" }}
														>
															{article.clean_url.split(".")[0]}
														</Typography>
														<Box sx={{ ml: .75, mr: .75 }}>
															<Typography variant="caption" color="text.secondary">
																•
															</Typography>
														</Box>
														<Typography variant="caption" color="text.secondary">
															about <ReactTimeAgo date={article.published_date} locale="en-US" timeStyle="round-minute"/>
														</Typography>
													</Box>
												</Box>
											</Box>
										</CardContent>
									</CardActionArea>
								</Card>
							)
						})}
					</Stack>
				</Box>
			)}
		</Layout>
	);
};

export default Page;
