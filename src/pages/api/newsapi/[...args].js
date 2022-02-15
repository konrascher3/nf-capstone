// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: Refactor caching w. https://www.npmjs.com/package/lru-cache
import axios from "axios";
import path from "node:path";

const REFRESH_INTERVAL = 1000 * 60 * 60;

const cache = {};
const handler = async (request, response) => {
	const { args, ...params } = request.query;
	const slug = args.join("/");

	const host = "newsapi.org";
	const endpoint = path.join(host, slug);
	const url = `https://${endpoint}`;

	const options = {
		params,
		headers: {
			Authorization: process.env.X_NEWSAPI_KEY,
		},
	};

	if (cache[url]) {
		console.log(`Getting data from cache on ${new Date().toISOString()}`);
		response.status(200).json(cache[url]);
	} else {
		console.log(`Fetching new data from API on ${new Date().toISOString()}`);
		const { data } = await axios.get(url, options);
		const fullData = { data, meta: { updatedOn: new Date().toISOString() } };
		cache[url] = fullData;
		setTimeout(() => {
			cache[url] = null;
		}, REFRESH_INTERVAL);
		response.status(200).json(fullData);
	}
};

export default handler;
