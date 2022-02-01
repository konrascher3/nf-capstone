import React from "react";

// Import logo
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg"

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Header = () => {
	return (
		<header>
			<Box sx={{flexGrow: 1}}>
				<AppBar position="static" elevation={1}>
					<Toolbar>
						<img style={{width: "180px"}} src={logoDarkMode.src} alt="Coin ghost logo" />
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
};

export default Header;
