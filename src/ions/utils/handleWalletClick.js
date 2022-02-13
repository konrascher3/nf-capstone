import Web3 from "web3";
import axios from "axios";

const web3 = new Web3(Web3.givenProvider);

// Signup helper-function
const handleSignup = publicAddress => {
	// Add new user to data-base
	return axios.post("/api/users/", {"publicAddress": `${publicAddress}`})
		.then(
			response => {
				console.log("New user added successfully:", response)
				return response
			}
		)
		.catch(
			error => {
				console.error("Could not add new user:", error)
			}
		);
};

// Sign-message helper-function
const handleSignMessage = async (publicAddress) => {
	// Retrieve nonce from database
	console.log("Retrieving nonce from database")
	const nonce = await axios.get(`/api/users?publicAddress=${publicAddress}`)
		.then(
			response => {
				console.log(response)
				console.log(`Nonce found for ${publicAddress}:`, response.data[0].nonce)
				return response.data[0].nonce
			}
		)
		.catch(error => {
			console.error(`Couldn't retrieve nonce for ${publicAddress}:`, error)
		});

	// Sign nonce
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
};

// Handle authentication helper-function
const handleAuthenticate = async ({ publicAddress, userSignature}) => {
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
		}
	} else if(!window.ethereum) {
		window.open("https://metamask.io/download/");
	}

	// Request public ethereum-accounts
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
	let publicAddress = null;

	// Check if selected account is valid and assign it
	if(web3.utils.isAddress(account)){
		console.log(`${account} is a valid eth-address!`)
		publicAddress = account.toLowerCase();
	}

	// Check if publicAddress already exists on back-end
	try {
		await axios.get(`/api/users?publicAddress=${publicAddress}`)
			.then(response => {
				if(response.data.length){
					handleSignMessage(publicAddress)
						.then(({ publicAddress, userSignature}) => {
							handleAuthenticate({ publicAddress, userSignature});
						});
				} else {
					handleSignup(publicAddress)
						.then(response => (handleSignMessage(publicAddress)))
						.then(({ publicAddress, userSignature}) => {
							handleAuthenticate({ publicAddress, userSignature});
						});
				}
				}
			)
	} catch (error) {
		console.error("Error fetching public address from database:", error)
	}
}

export default handleWalletClick
