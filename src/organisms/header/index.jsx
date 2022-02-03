import React from "react";
import PropTypes from "prop-types";

// Import logo
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg"

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//// Hide-on-scroll
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

// Icon Imports
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// useStore
import useStore from "/src/ions/hooks/state/useStore"

// Hide-on-scroll helper-functions
const HideOnScroll = (props) => {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}
HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

const Header = (props) => {
	const { open, setOpen } = useStore((state) => state)
	return (
		<header>
			<Box sx={{flexGrow: 1}}>
				{/* Empty toolbar to keep the content down */}
				<Toolbar />
				<HideOnScroll {...props}>
					<AppBar elevation={1}>
						<Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
							<img style={{width: "170px"}} src={logoDarkMode.src} alt="Coin ghost logo" />
							<IconButton color="inherit" aria-label="open drawer" edge="end">
								<MenuIcon onClick={() => {
									setOpen(!open)
								}} />
							</IconButton>
						</Toolbar>
					</AppBar>
				</HideOnScroll>
			</Box>
		</header>
	);
};

export default Header;
