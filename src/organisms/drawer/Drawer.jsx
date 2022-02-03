import React from "react"

// MUI Imports
import Box from "@mui/material/Box"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// Custom-components Imports
import DrawerList from "/src/molecules/drawer-list/DrawerList"

// useStore
import useStore from "/src/ions/hooks/state/useStore"


const Drawer = () => {
	const { open, setOpen } = useStore((state) => state)

	return (
		<SwipeableDrawer
			anchor="right"
			open={open}
			onOpen={()=>{setOpen(!open)}}
			onClose={()=>{setOpen(!open)}}
		>
			<Box>
				<DrawerList />
			</Box>
		</SwipeableDrawer>
	)
}

export default Drawer
