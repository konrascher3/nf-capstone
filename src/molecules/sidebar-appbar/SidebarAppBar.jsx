import React from "react";

// MUI Imports
import Icon from "@mdi/react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box"

// useStore
import useStore from "/src/ions/hooks/state/useStore"

import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg";

// Material-design-icons Imports
import { mdiClose } from "@mdi/js";


const SidebarAppBar = () => {
	const { open, setOpen } = useStore((state) => state)
	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar elevation={3} position="static">
				<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
					<img style={{width: "170px"}} src={logoDarkMode.src} alt="Coin ghost logo" />
					<IconButton color="inherit" aria-label="open drawer" edge="end">
						<Icon
							path={mdiClose} size={1}
							title="Close navbar"
							onClick={() => {
							setOpen(!open)
							}} />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default SidebarAppBar
