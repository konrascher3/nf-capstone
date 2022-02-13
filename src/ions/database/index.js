import mongoose from "mongoose";
import process from "node:process";

require('dotenv').config();

const MONGODB_COINGHOST_URI = process.env.MONGODB_COINGHOST_URI;

if (!MONGODB_COINGHOST_URI) {
	throw new Error("Please define the MONGODB_COINGHOST_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { connection: null, promise: null };
}

async function dbConnect() {
	if (cached.connection) {
		return cached.connection;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_COINGHOST_URI, opts).then(mongoose => {
			return mongoose;
		});
	}
	cached.connection = await cached.promise;
	return cached.connection;
}

export default dbConnect;
