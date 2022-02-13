import Web3 from "web3";
import axios from "axios";

const web3 = new Web3(Web3.givenProvider);

// Signup helper-function
const handleSignup = async (publicAddress) => {
	// Add new user to data-base
	await axios.post("/api/users/", { "publicAddress": `${publicAddress}` })
		.then(
			response => {
				console.log("New user added successfully:", response);
			}
		)
		.catch(
			error => {
				console.error("Could not add new user:", error);
			}
		);


};

// Sign-message helper-function
const handleSignMessage = async (publicAddress) => {

	// Retrieve nonce from database
	console.log("Retrieving nonce from database")
	console.log(publicAddress)
	const nonce = await axios.get(`/api/users?publicAddress=${publicAddress}`)
		.then(
			response => {
				console.log(response)
				console.log(`Nonce found for ${publicAddress}:`, response.data[0].nonce)
			}
		)
		.catch(error => {
			console.error(`Couldn't retrieve nonce for ${publicAddress}:`, error)

		});

	// Sign nonce
	if (nonce){
		return new Promise((resolve, reject) => {
			console.log("Asking user to sign nonce:", nonce)
			web3.eth.personal.sign(
				`Please sign this message to confirm ownership of your public-address.\n
					No transaction-cost occur.\n
					Your personal code is ${nonce}.`,
				publicAddress,
				(err, signature) => {
					if (err) return reject(err);
					const userSignature = signature
					console.log(signature)
					return resolve({ publicAddress, userSignature});
				}
			)
		})
	}
};

// Handle authentication helper-function
const handleAuthenticate = ({ publicAddress, userSignature }) => {
	// Handle MetaMask not installed

	// Verify signature
	// Defining request-header
	const options = {
		headers: {},
		data: {
			publicAddress,
			userSignature
		}
	};

	axios.post("/api/auth/", options)
		.then(
			response => {
				console.log("Signature validated:", response)
			}
		)
		.catch(
			error => {
				console.error("Could not validate signature:", error)
			}
		);
	console.log(`Authenticating publicAddress ${publicAddress} with signature ${userSignature}`)
};


const handleWalletClick = async () => {
	// Allow site to connect to MetaMask
	if(window.ethereum) {
		try {
			await ethereum.enable();
		} catch (error) {
			window.alert("You need to allow MetaMask.");
			return;
		}
	} else if(!window.ethereum) {
		window.open("https://metamask.io/download/");
		return;
	}

	// Request public ethereum-address
	const account = web3.eth.getAccounts((error,result) => {
		if (error) {
			console.error(".getAccounts failed:", error);
		} else {
			try {
				const ethAddress = web3.currentProvider.selectedAddress;
				// Check if ethereum-address is valid
				console.log("Checking address")

				if(web3.utils.isAddress(ethAddress)) {
					console.log("Valid ethAddress!", ethAddress)

					// Set ethAddress to lower-case
					const publicAddress = ethAddress.toLowerCase();

					// Check if publicAddress already exists on back-end
					axios.get(`/api/users?publicAddress=${publicAddress}`)
						.then(response => {
							// If yes, retrieve it, if no, create new user;
							(response.data.length
								? (console.log("User already registered:", response.data[0]))
								: handleSignup(publicAddress))
						})
						// Popup MetaMask confirmation modal to sign message
						.then(handleSignMessage(publicAddress)
							// Send signature to back end on the /auth route
							.then(handleAuthenticate)
							.catch(
								error => {
									console.error(error)
								}
							)
						)
				} else {
					console.error("Invalid ethAddress:", ethAddress)
				}
			} catch(error) {
				console.error(error)
			}
		}
	});}

export default handleWalletClick
