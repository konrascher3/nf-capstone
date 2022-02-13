require('dotenv').config();
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	env: {
		X_NEWSAPI_KEY: process.env.X_NEWSAPI_KEY,
		X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY,
		MONGODB_COINGHOST_URI: process.env.MONGODB_COINGHOST_URI,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
	}
}

module.exports = nextConfig

