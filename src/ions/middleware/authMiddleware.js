import jwt from "jsonwebtoken";

import { config } from "/backend/src/config";
import Favorites from "/src/ions/models/favorites.model";

const protect = async (request, response) => {
	if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
		try {
			// Get token from header; ("Bearer 3980r3756340798564327...")
			const token = request.headers.authorization.split(" ")[1];

			// Verify the token
			const {
				payload: { id },
			} = await jwt.verify(token, config.secret);

			// Get userId from token

			request.userId = await Favorites.findOne({ ObjectId: id });

			// next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				console.log("Token expired. Please login again!");
			}
			console.log("Could not verify token:", error);
			response.status(401);
		}
	} else {
		response.status(401).send("not authorized, no token");
	}
};

export default protect;
