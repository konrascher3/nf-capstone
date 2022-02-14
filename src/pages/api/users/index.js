import Item from "/src/ions/models/user.model";
import dbConnect from "/src/ions/database/index";

const handler = async (request, response) => {
	const { method } = request;

	await dbConnect();

	switch (method) {
		// READ
		case "GET":
			try {
				const mongoresponse = await Item.find(request.query ? request.query : "");
				response.status(200).json(mongoresponse);
			} catch (err) {
				console.log(err);
			}
			break;
		// CREATE
		case "POST":
			try {
				console.log(request.body);
				const mongoresponse = await Item.create(request.body);
				response.status(201).json(mongoresponse);
			} catch (err) {
				console.log(err);
			}
			break;

		default:
			response.status(404).send("not found");
	}
};

export default handler;
