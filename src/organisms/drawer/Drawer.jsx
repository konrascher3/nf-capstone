import React from "react"

// MUI Imports
import Box from "@mui/material/Box"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import ExploreIcon from '@mui/icons-material/Explore';

// useStore
import useStore from "/src/ions/hooks/state/useStore"


const Drawer = () => {
	const { open, setOpen } = useStore((state) => state)
	console.log(open)

	return (
		<SwipeableDrawer
			anchor="right"
			open={open}
			onOpen={()=>{}}
			onClose={()=>{setOpen(!open)}}
		>
			<Box>
				<List>
					<ListItem button>
						<ListItemIcon><ExploreIcon /></ListItemIcon>
						<ListItemText>Explore</ListItemText>
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText>Watchlist</ListItemText>
					</ListItem>
				</List>
			</Box>
		</SwipeableDrawer>
	)
}

export default Drawer
