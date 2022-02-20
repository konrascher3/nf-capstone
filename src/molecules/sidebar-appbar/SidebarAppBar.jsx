import React from "react";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";
import useColorMode from "/src/ions/hooks/state/useColorMode";

// Import Logos
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg";
import logoLightMode from "/src/ions/img/logos/complete-logo-light-mode-optimized.svg";

// Custom Import
import ToggleThemeComponent from "/src/molecules/toggle-theme-component/ToggleThemeComponent";

// Material-design-icons Imports
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

const SidebarAppBar = () => {
	const open = useStore(state => state.open);
	const setOpen = useStore(state => state.setOpen);
	const colorMode = useColorMode(state => state.colorMode);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar elevation={3} position="static">
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
				>
					<img
						style={{ width: "170px" }}
						src={colorMode ? logoDarkMode.src : logoLightMode.src}
						alt="Coin ghost logo"
					/>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: 1.5,
						}}
					>
						<ToggleThemeComponent />

						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={() => {
								setOpen(!open);
							}}
						>
							<Icon path={mdiClose} size={1} />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default SidebarAppBar;
