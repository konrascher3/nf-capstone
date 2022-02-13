import dbConnect from "/src/ions/database/index";
import Item from "../../../ions/models/user.model";

import * as ethUtil from "ethereumjs-util";
import * as sigUtil from "eth-sig-util";
import jwt from 'jsonwebtoken';
import { config } from "/backend/src/config"


const handler = async (request, response) => {
	const { userSignature, publicAddress } = request.body.data
	await dbConnect();

	// Return error if no signature or publicAddress were passed
	if (!userSignature || !publicAddress)
		return response
			.status(400)
			.send({ error: "Request should have signature and publicAddress" });

	// We need to validate if the user has signed the correct nonce!
	// To summarize this block, what it does is, given our msg (containing the nonce)
	// and our signature, the ecrecover function outputs the public address used to sign
	// the msg. If it matches our publicAddress from the request body, then the user
	// who made the request successfully proved their ownership of publicAddress.
	// We consider them authenticated.

	// Step 1: Get the user with the given publicAddress
	try {

		// Retrieve nonce for the requested publicAddress from the database
		await Item.find({ publicAddress:`${publicAddress}`} )
			.then(mongooseresponse => {
				console.log("mongooseresponse", mongooseresponse[0].publicAddress)
				if(!mongooseresponse[0].publicAddress){
					response.status(400).send({ error: `Couldn't find public address ${publicAddress} in the database` });
				}

				// Step 2: Verify digital signature
				console.log(mongooseresponse[0].nonce)
				const msg = `Please sign this message to confirm ownership of your public-address.\n
				No transaction-cost occur.\n
				Your personal code is ${mongooseresponse[0].nonce}.`;
				console.log("msg", msg)

				// We now are in possession of msg, publicAddress and signature. We
				// will use a helper from eth-sig-util to extract the address from the signature
				const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
				const address = sigUtil.recoverPersonalSignature({
					data: msgBufferHex,
					sig: userSignature
				});

				// The signature verification is successful if the address found with
				// sigUtil.recoverPersonalSignature matches the initial publicAddress
				if (address.toLowerCase() === publicAddress.toLowerCase()) {
					console.log("Nonce verified successfully");

					// Step 3: Generate a new nonce for the user for the follow-up login
					try {
						const filter = { publicAddress: `${publicAddress}` };
						const update = { nonce: Math.floor(Math.random() * 1000000) };
						const updateNonce = async () => await Item.findOneAndUpdate(filter, update, { new: true } )
						updateNonce()

						// Step 4: Create and return JWT
						return new Promise((resolve, reject) =>
							jwt.sign(
								{
									payload: {
										id: mongooseresponse[0]._id,
										publicAddress
									}
								},
								config.secret,
								{},
								(err, token) => {
									if (err) {
										return reject(err);
									}
									return  resolve(token)
								}
							))
							.then(accessToken => {
								return response
									.status(200)
									.json({ accessToken })
							})
					} catch (err) {
						response.status(400).send({ error: "Couldn't update new nonce" });
					}
				} else {
					return response
						.status(401)
						.send({ error: 'Signature verification failed' });
				}
			})
	} catch (err) {
		response.status(400).send({ error: "Couldn't authenticate public address" });
	}
}

export default handler
