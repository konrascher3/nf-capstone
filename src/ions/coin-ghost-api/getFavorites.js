import dbConnect from "/src/ions/database/index";
import Favorites from "/src/ions/models/favorites.model";

import protect from "/src/ions/middleware/authMiddleware";

const getFavorites = async (request, response) => {
	await dbConnect();
	await protect(request, response);
	try {
		const mongoresponse = await Favorites.findOne({
			ObjectId: request.userId,
		});
		response.status(200).json(mongoresponse);
	} catch (err) {
		console.log(err);
	}
};

export default getFavorites;
