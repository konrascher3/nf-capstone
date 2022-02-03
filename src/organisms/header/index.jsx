import React from "react";

// Import logo
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg"

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
	return (
		<header>
			<Box sx={{flexGrow: 1}}>
				<AppBar position="static" elevation={1}>
					<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
						<img style={{width: "180px"}} src={logoDarkMode.src} alt="Coin ghost logo" />
						<IconButton>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
};

export default Header;
