import React from "react";
// import Link from "next/link";

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
				<AppBar position="static">
					<Toolbar>
						<img style={{width: "180px"}} src={logoDarkMode.src} alt="Coin ghost logo" />
					</Toolbar>
				</AppBar>
			</Box>
			{/*<nav data-test-id="navigation">*/}
			{/*	<Link href="/">Home</Link>*/}
			{/*	<Link href="/about">About me</Link>*/}
			{/*</nav>*/}
		</header>
	);
};

export default Header;
