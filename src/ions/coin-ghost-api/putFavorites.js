import dbConnect from "../database";
import Favorites from "../models/Favorites.model";

import protect from "/src/ions/middleware/authMiddleware";

const putFavorites = async (request, response) => {
	await dbConnect();

	const favorites = request.body.favorites;

	await protect(request, response);

	try {
		const filter = request.userId.userId;
		const update = { favorites };
		const mongoresponse = await Favorites.findOneAndUpdate(filter, update);
		response.status(201).json(mongoresponse);
		console.log("Updated array", mongoresponse);
	} catch (err) {
		console.log(err);
	}
};

export default putFavorites;
