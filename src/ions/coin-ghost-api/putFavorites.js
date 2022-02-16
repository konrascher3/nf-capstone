import dbConnect from "../database";
import Item from "../models/user.model";

import protect from "/src/ions/middleware/authMiddleware";

const putFavorites = async (request, response) => {
	await dbConnect();

	const favorites = request.body.favorites;

	await protect(request, response);

	try {
		const filter = response.userId;
		const update = { favorites };
		const mongoresponse = await Item.findOneAndUpdate(filter, update);
		response.status(201).json(mongoresponse);
	} catch (err) {
		console.log(err);
	}
};

export default putFavorites;
