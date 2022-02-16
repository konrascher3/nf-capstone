import dbConnect from "/src/ions/database/index";
import Favorites from "/src/ions/models/favorites.model";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

const setFavorites = async (request, response) => {
	await dbConnect();

	const publicAddress = request.query.publicAddress ?? request.body.publicAddress;
	const userId = request.query.userId ?? request.body.userId;

	if (web3.utils.isAddress(publicAddress) && userId) {
		try {
			const mongoresponse = await Favorites.create({
				userId,
			});
			response.status(200).json(mongoresponse);
		} catch (err) {
			console.log(err);
		}
	} else {
		response.status(400).send("bad request");
	}
};

export default setFavorites;
