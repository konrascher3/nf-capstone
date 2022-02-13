import React from 'react';
import { useRouter } from "next/router"

// MUI Imports
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import { makeStyles }  from "@mui/styles";
import CardActionArea from "@mui/material/CardActionArea"

// Material-design-icons Imports
import Icon from '@mdi/react'
import { mdiTelescope } from '@mdi/js'
import { mdiFileStar } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiNewspaperVariant } from '@mdi/js';
import { mdiWallet } from '@mdi/js';

// useStore
import useStore from "/src/ions/hooks/state/useStore";
import MetaMaskFox from "/src/ions/img/metamask/metamask-fox.svg";

// handleWalletClick
import handleWalletClick from "/src/ions/utils/handleWalletClick"

const useStyles = makeStyles({
	hideBorder: {
		'&.MuiAccordion-root::before': {
			display: 'none',
		},
	},
})




// TODO: add map function to map list items over nav-links
// TODO: Improve DRY 😪
const DrawerList = () => {
	const classes = useStyles()

	const router = useRouter();
	const setOpen = useStore((state) => state.setOpen)
	return (
		<List sx={{ width: "100vw", padding: 0 }}>
			<ListItem button onClick={()=>{router.push("/"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiTelescope} size={1} title="Explore coins"/></ListItemIcon>
				<ListItemText>
					<Typography variant="body1">Explore</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem button onClick={()=>{router.push("/watchlist"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiFileStar} size={1} title="Watchlist"/></ListItemIcon>
				<ListItemText>
					<Typography variant="body1">Watchlist</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem button onClick={()=>{router.push("/search"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiMagnify} size={1} title="Search coins"/></ListItemIcon>
				<ListItemText>
					<Typography variant="body1">Search</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem button onClick={()=>{router.push("/news"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiNewspaperVariant} size={1} title="News"/></ListItemIcon>
				<ListItemText>
					<Typography variant="body1">News</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<Accordion disableGutters className={classes.hideBorder} elevation={0}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="connect-wallet"
					id="connect-wallet-header"
				>
					<ListItemIcon><Icon path={mdiWallet} size={1} title="News"/></ListItemIcon>

					<Typography variant="body1">Connect a wallet</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<ListItem sx={{display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Card sx={{width: "90%", display: "flex", p: 1, borderRadius: 4.5}}>
							<CardActionArea onClick={() => {handleWalletClick()}}>
								<Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: 4.5}}>
									<Box sx={{display: "flex"}}>
										<img src={MetaMaskFox.src} alt="MetaMask logo" style={{ width: 45 }} />
									</Box>
									<Box sx={{display: "flex", alignItems: "center", justifyContent: "center" }}>
										<Typography variant="subtitle2" fontWeight={600}>Connect to MetaMask</Typography>
									</Box>
								</Box>
							</CardActionArea>
						</Card>
					</ListItem>
				</AccordionDetails>

			</Accordion>

		</List>
	)
}

export default DrawerList
