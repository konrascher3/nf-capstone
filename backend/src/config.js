require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const config = {
	secret: JWT_SECRET_KEY
};
