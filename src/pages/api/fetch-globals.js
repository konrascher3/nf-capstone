// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Fetches global data from CoinGecko-API

import axios from "axios";
import cheerio from "cheerio";
const parser = str => Number.parseFloat(str.replace(/[$,]/g, ""));
const handler = async (request, response) => {
	try {
		const { data } = await axios.get(`https://www.coingecko.com/en/overall_stats`);
		const $ = cheerio.load(data);
		const selector = `body > div > [class*="mr-"]`;
		const $entries = $(selector);
		const map = { dominance: {} };
		$entries.each((index, item) => {
			const key = $(item).find(">span").text().trim().replace(/:$/, "");
			const value = $(item).find(">a").text().trim();
			if (key && key.toLowerCase() !== "dominance" && key.toLowerCase() !== "market cap") {
				map[key] = parser(value);
			} else if (key.toLowerCase() === "market cap") {
				map[key] = value.split(/\s+/).map(v => parser(v));
			} else if (!key) {
				const [dominanceKey, dominanceValue] = value.split(/\s+/);
				map.dominance[dominanceKey] = Number.parseFloat(dominanceValue);
			}
		});

		response.status(200).json(map);
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: { message: "oops" } });
	}
};

export default handler;
