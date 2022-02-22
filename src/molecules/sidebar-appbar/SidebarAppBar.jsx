import React from "react";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

// Custom Import
import ToggleThemeComponent from "/src/molecules/toggle-theme-component/ToggleThemeComponent";

// Material-design-icons Imports
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import GhostLogoFull from "../../ions/img/ghost-logo-full/GhostLogoFull";

const SidebarAppBar = () => {
	const open = useStore(state => state.open);
	const setOpen = useStore(state => state.setOpen);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar elevation={3} position="static">
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
				>
					<GhostLogoFull />
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
