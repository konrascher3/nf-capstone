import React from "react";

// Import logo
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg"

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// useStore
import useStore from "/src/ions/hooks/state/useStore"


const Header = () => {
	const { open, setOpen } = useStore((state) => state)
	return (
		<header>
			<Box sx={{flexGrow: 1}}>
				<AppBar position="static" elevation={1}>
					<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
						<img style={{width: "170px"}} src={logoDarkMode.src} alt="Coin ghost logo" />
						<IconButton color="inherit" aria-label="open drawer" edge="end">
							<MenuIcon onClick={() => {
								setOpen(!open)
							}} />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
};

export default Header;
