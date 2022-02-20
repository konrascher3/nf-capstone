import React from "react";

// MUI Imports
import Icon from "@mdi/react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

// useStore
import useStore from "/src/ions/hooks/state/useStore";
import useColorMode from "/src/ions/hooks/state/useColorMode";

// Import logo
import logoDarkMode from "/src/ions/img/logos/complete-logo-dark-mode-optimized.svg";
import logoLightMode from "/src/ions/img/logos/complete-logo-light-mode-optimized.svg";

// Material-design-icons Imports
import { mdiClose } from "@mdi/js";
import { mdiWeatherNight } from "@mdi/js";
import { mdiWhiteBalanceSunny } from "@mdi/js";

const SidebarAppBar = () => {
	const open = useStore(state => state.open);
	const setOpen = useStore(state => state.setOpen);
	const setColorMode = useColorMode(state => state.setColorMode);
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
							gap: 1.75,
						}}
					>
						<Switch
							size="medium"
							sx={{
								width: 62,
								".MuiSwitch-switchBase": {
									transform: "translate(-1px, -1.5px)",
									"&.Mui-checked": {
										transform: "translate(23px, -1.5px)",
									},
									"&& .MuiTouchRipple-child": {
										backgroundColor: "blue",
									},
									// "& .MuiSwitch-thumb:before": {
									// 	width: 32,
									// 	height: 32,
									// },
								},
							}}
							checked={colorMode}
							checkedIcon={
								<Box
									sx={{
										boxShadow: 1,
										p: 0.3,
										borderRadius: 100,
										color: "hsl(225, 27%, 31%)",
										backgroundColor: "hsl(326, 100%, 74%)",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Icon path={mdiWeatherNight} size={0.8} />
								</Box>
							}
							icon={
								<Box
									sx={{
										// transform: "translateY(-3px)",
										boxShadow: 1,
										p: 0.3,
										borderRadius: 100,
										color: "hsl(225, 27%, 31%)",
										backgroundColor: "hsl(60, 30%, 96%)",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Icon path={mdiWhiteBalanceSunny} size={0.8} />
								</Box>
							}
							onChange={() => {
								setColorMode(colorMode);
							}}
						/>

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
