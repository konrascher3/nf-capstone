require("dotenv").config();
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
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
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		API_ROUTE_KEY: process.env.API_ROUTE_KEY,
	},
	pwa: {
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/],
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
};

module.exports = withPWA(nextConfig);
