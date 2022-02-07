// import express from "express";
// import axios from "axios";
// import cors from "cors";
//
// import { writeFile, readFile } from "fs/promises";
// import { promises as fs } from "fs";
// import { v4 as uuid } from "uuid";

// import dotenv from "dotenv";
// dotenv.config()
//
// const app = express();
// app.use(express.json());
// app.use(cors());
//
// const port = 1337;
// const fileName = "news.json";

// Update News.json every hour
// const updateNews = () => {
// 	const options = {
		// method: "GET",
		// url: "https://free-news.p.rapidapi.com/v1/search",
		// params: {q: "Crypto,Cryptocurrency", lang: 'en'},
	// 	headers: {
	// 		"x-rapidapi-host": "free-news.p.rapidapi.com",
	// 		"x-rapidapi-key": process.env.X_RAPIDAPI_KEY
	// 	}
	// }
	// Fetch data from news-API
// 	axios.request(options).then(function (axiosData) {
// 		const dateUpdated = new Date().toISOString()
// 		console.log(`Updated news.json on ${dateUpdated}`)
// 		const data = {
// 			updatedOn: dateUpdated,
// 			articles: axiosData.data.articles
// 		}
// 		// Write results to news.json
// 		void writeFile(fileName, JSON.stringify(data, null, 4))
// 		// response.json({ News: "Updated successfully" })
// 	}).catch(function (error) {
// 		console.error(error);
// 	});
// }
// const interval = setInterval( updateNews, 6000);

// app.get("/", (request, response) => {
// 	response.send("hello world");
// });
//
// app.get("/news", (request, response) => {
// 	readFile(fileName, "utf-8").then(content => {
// 		response.send(JSON.parse(content));
// 	});
// });


// app.get("/coin-market-data", async (request, response, next) => {
// 	console.log("/coin-market-data call");
// 	try {
// 		const axiosData = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false");
// 		response.json(axiosData.data);
// 	}
// 	catch (err) {
// 		next(err)
// 	}
// })

// app.listen(port, () => {
// 	console.log(`I am listening on port ${port}`)
// })
