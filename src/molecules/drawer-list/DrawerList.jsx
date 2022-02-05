import React from 'react';
import { useRouter } from "next/router"

// MUI Imports
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Material-design-icons Imports
import Icon from '@mdi/react'
import { mdiTelescope } from '@mdi/js'
import { mdiFileStar } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiNewspaperVariant } from '@mdi/js';

// useStore
import useStore from "/src/ions/hooks/state/useStore";


// TODO: add map function to map list items over nav-links
// TODO: Improve DRY 😪
const DrawerList = () => {
	const router = useRouter();
	const { setOpen } = useStore((state) => state)
	return (
		<List sx={{ width: "100vw", padding: 0 }}>
			<ListItem button onClick={()=>{router.push("/"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiTelescope} size={1} title="Explore coins"/></ListItemIcon>
				<ListItemText>Explore</ListItemText>
			</ListItem>
			<Divider />
			<ListItem button onClick={()=>{router.push("/watchlist"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiFileStar} size={1} title="Explore coins"/></ListItemIcon>
				<ListItemText>Watchlist</ListItemText>
			</ListItem>
			<Divider />
			<ListItem button onClick={()=>{router.push("/easteregg"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiMagnify} size={1} title="Explore coins"/></ListItemIcon>
				<ListItemText>Search</ListItemText>
			</ListItem>
			<Divider />
			<ListItem button onClick={()=>{router.push("/easteregg"); setOpen(false)}}>
				<ListItemIcon><Icon path={mdiNewspaperVariant} size={1} title="Explore coins"/></ListItemIcon>
				<ListItemText>News</ListItemText>
			</ListItem>
		</List>
	)
}

export default DrawerList
