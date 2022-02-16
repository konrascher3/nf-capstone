import Item from "/src/ions/models/user.model";
import dbConnect from "/src/ions/database/index";

import process from "node:process";

const API_ROUTE_KEY = process.env.API_ROUTE_KEY;

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

const handler = async (request, response) => {
	await dbConnect();
	const { method } = request;
	const publicAddressQuery = request.query.publicAddress;
	const publicAddressBody = request.body.publicAddress;
	const favorites = request.body.favorites;

	// Add password to header
	request.headers["authorization"] = API_ROUTE_KEY;

	if (
		request.headers.authorization === API_ROUTE_KEY &&
		web3.utils.isAddress(publicAddressBody || publicAddressQuery)
	) {
		switch (method) {
			// READ
			case "GET":
				try {
					const mongoresponse = await Item.find({
						publicAddress: `${publicAddressQuery}`,
					});
					response.status(200).json(mongoresponse);
				} catch (err) {
					console.log(err);
				}
				break;
			// CREATE
			case "POST":
				try {
					const mongoresponse = await Item.create({
						publicAddress: `${publicAddressBody}`,
						favorites: favorites,
					});
					response.status(201).json(mongoresponse);
				} catch (err) {
					console.log(err);
				}
				break;
			// UPDATE
			case "PUT":
				try {
					const filter = { publicAddress: `${publicAddressBody}` };
					const update = { favorites: favorites };
					const mongoresponse = await Item.findOneAndUpdate(filter, update);
					response.status(201).json(mongoresponse);
				} catch (err) {
					console.log(err);
				}
				break;
			default:
				response.status(404).send("not found");
		}
	} else {
		response.status(401).send("Unauthorized");
	}
};

export default handler;
