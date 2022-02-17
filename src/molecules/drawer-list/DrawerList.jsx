import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

import axios from "axios";

import Cookies from "js-cookie";

// MUI Imports
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import CardActionArea from "@mui/material/CardActionArea";

// Material-design-icons Imports
import Icon from "@mdi/react";
import { mdiTelescope } from "@mdi/js";
import { mdiFileStar } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";
import { mdiNewspaperVariant } from "@mdi/js";
import { mdiWallet } from "@mdi/js";

// useStore
import useStore from "/src/ions/hooks/state/useStore";
import MetaMaskFox from "/src/ions/img/metamask/metamask-fox.svg";
import checkMobile from "../../ions/utils/checkMobile";

const useStyles = makeStyles({
	hideBorder: {
		"&.MuiAccordion-root::before": {
			display: "none",
		},
	},
});

// TODO: add map function to map list items over nav-links
// TODO: Improve DRY 😪
const DrawerList = () => {
	const classes = useStyles();

	const router = useRouter();
	const setOpen = useStore(state => state.setOpen);

	const setLoggedIn = useStore(state => state.setLoggedIn);
	const loggedIn = useStore(state => state.loggedIn);

	// handleLogout
	const handleLogout = () => {
		Cookies.remove("coin-ghost-auth");
		setLoggedIn(false);
		console.log("Logged out successfully!");
		setOpen(false);
	};

	// Signup helper-function
	const handleSignup = async publicAddress => {
		// Add new user to data-base
		const user = await axios
			.put("/api/user/set", {
				publicAddress: `${publicAddress}`,
			})
			.then(response => {
				console.log("New user added successfully!");
				return response;
			})
			.catch(error => {
				console.error("Could not add new user:", error);
			});

		// After user has been generated, add initial favorites to account

		const initialFavorites = await axios
			.put("/api/favorites/set", {
				publicAddress: user.data.publicAddress,
				userId: user.data._id,
			})
			.then(response => {
				console.log("Initial favorites added successfully!");
				return response;
			})
			.catch(error => {
				console.error("Could not add initial favorites:", error);
			});
		return initialFavorites;
	};

	// Sign-message helper-function
	const handleSignMessage = async publicAddress => {
		// Retrieve nonce from database

		const nonce = await axios
			.get(`/api/user/get?publicAddress=${publicAddress}`)
			.then(response => {
				return response.data.nonce;
			})
			.catch(error => {
				console.error(`Couldn't retrieve nonce for ${publicAddress}:`, error);
			});

		// Sign nonce
		return new Promise((resolve, reject) => {
			web3.eth.personal.sign(
				`Please sign this message to confirm ownership of your public-address.\n
				No transaction-cost occur.\n
				Your personal code is ${nonce}.`,

				publicAddress,
				(err, signature) => {
					if (err) return reject(err);
					const userSignature = signature;
					return resolve({ publicAddress, userSignature });
				}
			);
		});
	};

	// Handle authentication helper-function
	const handleAuthenticate = async ({ publicAddress, userSignature }) => {
		const options = {
			headers: {},
			data: {
				publicAddress,
				userSignature,
			},
		};

		axios
			.post("/api/auth", options)
			.then(response => {
				const { token } = response.data;
				// Store token in browser-cookies for 1 hour
				Cookies.set("coin-ghost-auth", token);
				const authToken = Cookies.get("coin-ghost-auth");
				if (authToken) {
					setLoggedIn(true);
					console.log("Logged in successfully!");
					setOpen(false);
				}
			})
			.catch(error => {
				console.error("Could not validate signature:", error);
			});
	};

	const initiateLogin = async () => {
		// Allow site to connect to MetaMask
		if (window.ethereum && window.ethereum.isMetaMask) {
			try {
				await window.ethereum.enable();
				// Request public ethereum-accounts
				const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
				const account = accounts[0];
				let publicAddress = null;

				// Check if selected account is valid and assign it
				if (web3.utils.isAddress(account)) {
					publicAddress = account.toLowerCase();
					// Check if publicAddress already exists on back-end
					try {
						await axios
							.get(`/api/user/get?publicAddress=${publicAddress}`)
							.then(response => {
								if (response.data.hasOwnProperty("publicAddress")) {
									handleSignMessage(publicAddress).then(
										({ publicAddress, userSignature }) => {
											handleAuthenticate({ publicAddress, userSignature });
										}
									);
								} else {
									handleSignup(publicAddress)
										.then(initialFavorites => handleSignMessage(publicAddress))
										.then(({ publicAddress, userSignature }) => {
											handleAuthenticate({ publicAddress, userSignature });
										});
								}
							});
					} catch (error) {
						console.error("Error fetching public address from database:", error);
					}
				} else {
					console.error("Invalid eth address");
				}
			} catch (error) {
				window.alert("You need to allow MetaMask.");
			}
		} else if (!window.ethereum) {
			window.open("https://metamask.io/download/");
		}
	};

	const handleWalletClick = async () => {
		await initiateLogin();
	};
	return (
		<List sx={{ width: "100vw", padding: 0 }}>
			<ListItem
				button
				onClick={() => {
					router.push("/");
					setOpen(false);
				}}
			>
				<ListItemIcon>
					<Icon path={mdiTelescope} size={1} />
				</ListItemIcon>
				<ListItemText>
					<Typography variant="body1">Explore</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem
				button
				onClick={() => {
					router.push("/watchlist");
					setOpen(false);
				}}
			>
				<ListItemIcon>
					<Icon path={mdiFileStar} size={1} />
				</ListItemIcon>
				<ListItemText>
					<Typography variant="body1">Watchlist</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem
				button
				onClick={() => {
					router.push("/search");
					setOpen(false);
				}}
			>
				<ListItemIcon>
					<Icon path={mdiMagnify} size={1} />
				</ListItemIcon>
				<ListItemText>
					<Typography variant="body1">Search</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem
				button
				onClick={() => {
					router.push("/news");
					setOpen(false);
				}}
			>
				<ListItemIcon>
					<Icon path={mdiNewspaperVariant} size={1} />
				</ListItemIcon>
				<ListItemText>
					<Typography variant="body1">News</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			{loggedIn ? (
				<Box sx={{ mt: 5 }}>
					<ListItem
						sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
					>
						<Card sx={{ width: "90%", display: "flex", p: 1, borderRadius: 4.5 }}>
							<CardActionArea
								onClick={() => {
									handleLogout();
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										width: "100%",
										gap: 4.5,
									}}
								>
									<Box sx={{ display: "flex" }}>
										<img
											src={MetaMaskFox.src}
											alt="MetaMask logo"
											style={{ width: 45 }}
										/>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Typography variant="subtitle2" fontWeight={600}>
											Disconnect from MetaMask
										</Typography>
									</Box>
								</Box>
							</CardActionArea>
						</Card>
					</ListItem>
				</Box>
			) : (
				<Accordion disableGutters className={classes.hideBorder} elevation={0}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="connect-wallet"
						id="connect-wallet-header"
					>
						<ListItemIcon>
							<Icon path={mdiWallet} size={1} />
						</ListItemIcon>
						<Typography variant="body1">Connect a wallet</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ListItem
							sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
						>
							<Card sx={{ width: "90%", display: "flex", p: 1, borderRadius: 4.5 }}>
								<CardActionArea
									onClick={() => {
										handleWalletClick();
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "100%",
											gap: 4.5,
										}}
									>
										<Box sx={{ display: "flex" }}>
											<img
												src={MetaMaskFox.src}
												alt="MetaMask logo"
												style={{ width: 45 }}
											/>
										</Box>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Typography variant="subtitle2" fontWeight={600}>
												Connect to MetaMask
											</Typography>
										</Box>
									</Box>
								</CardActionArea>
							</Card>
						</ListItem>
					</AccordionDetails>
				</Accordion>
			)}
		</List>
	);
};

export default DrawerList;
