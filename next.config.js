require('dotenv').config();
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	env: {
		X_NEWSAPI_KEY: process.env.X_NEWSAPI_KEY,
		X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY
	}
}

module.exports = nextConfig

