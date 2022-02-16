import Item from "/src/ions/models/user.model";
import dbConnect from "/src/ions/database/index";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

const setUser = async (request, response) => {
	await dbConnect();

	const publicAddress = request.query.publicAddress ?? request.body.publicAddress;

	if (web3.utils.isAddress(publicAddress)) {
		try {
			const mongoresponse = await Item.create({
				publicAddress,
			});
			response.status(201).json(mongoresponse);
		} catch (err) {
			console.log(err);
		}
	} else {
		response.status(400).send("bad request");
	}
};

export default setUser;
