import { useRouter } from "next/router";
import React from "react";
import PropTypes from "prop-types";

// Import logo
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg";
import logoLightMode from "/src/ions/img/logos/complete-logo-light-mode-optimized.svg";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";

//// Hide-on-scroll
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

// Icon Imports
import IconButton from "@mui/material/IconButton";

// useStore
import useStore from "/src/ions/hooks/state/useStore";
import useColorMode from "/src/ions/hooks/state/useColorMode";

// Material-design-icons Imports
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";

// Hide-on-scroll helper-functions
const HideOnScroll = props => {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};
HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

const Header = props => {
	const router = useRouter();
	const open = useStore(state => state.open);
	const setOpen = useStore(state => state.setOpen);
	const colorMode = useColorMode(state => state.colorMode);

	return (
		<header>
			<Box sx={{ flexGrow: 1 }}>
				{/* Empty toolbar to keep the content down */}
				<Toolbar id="back-to-top-anchor" />
				<HideOnScroll {...props}>
					<AppBar elevation={1}>
						<Toolbar
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box
								sx={{ display: "flex", cursor: "pointer" }}
								onClick={() => {
									router.push("/");
								}}
							>
								<img
									style={{ width: "170px" }}
									src={colorMode ? logoDarkMode.src : logoLightMode.src}
									alt="Coin ghost logo"
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									gap: 1.5,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{router.pathname === "/search" ? (
									""
								) : (
									<IconButton
										id="foo"
										color="inherit"
										aria-label="open drawer"
										edge="end"
										onClick={() => {
											router.push("/search");
										}}
									>
										<Icon path={mdiMagnify} size={1} />
									</IconButton>
								)}
								<IconButton
									color="inherit"
									aria-label="open drawer"
									edge="end"
									onClick={() => {
										setOpen(!open);
									}}
								>
									<Icon path={mdiMenu} size={1} />
								</IconButton>
							</Box>
						</Toolbar>
					</AppBar>
				</HideOnScroll>
			</Box>
		</header>
	);
};

export default Header;
