import React from "react"

// MUI Imports
import Box from "@mui/material/Box"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// Custom-components Imports
import DrawerList from "/src/molecules/drawer-list/DrawerList"

// useStore
import useStore from "/src/ions/hooks/state/useStore"
import SidebarAppBar from "/src/molecules/sidebar-appbar/SidebarAppBar";


const Drawer = () => {
	const open = useStore((state) => state.open);
	const setOpen = useStore((state) => state.setOpen);

	return (
		<SwipeableDrawer
			anchor="left"
			open={open}
			onOpen={()=>{setOpen(!open)}}
			onClose={()=>{setOpen(!open)}}
		>
			<Box>
				<SidebarAppBar />
				<DrawerList />
			</Box>
		</SwipeableDrawer>
	)
}

export default Drawer
