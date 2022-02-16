import setUser from "/src/ions/coin-ghost-api/setUser";
import getUser from "/src/ions/coin-ghost-api/getUser";

import setFavorites from "/src/ions/coin-ghost-api/setFavorites";
import getFavorites from "/src/ions/coin-ghost-api/getFavorites";
import putFavorites from "/src/ions/coin-ghost-api/putFavorites";

import authUser from "/src/ions/coin-ghost-api/authUser";

const handler = (request, response) => {
	const {
		args: [route, operation],
		...params
	} = request.query;

	switch (route) {
		case "favorites":
			switch (operation) {
				case "set":
					setFavorites(request, response);
					break;
				case "get":
					getFavorites(request, response);
					break;
				case "put":
					putFavorites(request, response);
					break;
			}
			break;
		case "user":
			switch (operation) {
				case "set":
					setUser(request, response);
					break;
				case "get":
					getUser(request, response);
					break;
			}
			break;
		case "auth":
			authUser(request, response);
			break;
		default:
			response.status(404).send("page not found");
			break;
	}
};

export default handler;
