import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";

// Material-design-icons Imports
import Icon from "@mdi/react";
import { mdiMoonWaxingCrescent, mdiCheckboxBlankCircleOutline } from "@mdi/js";

// useColorMode
import useColorMode from "/src/ions/hooks/state/useColorMode";

const ToggleThemeComponent = () => {
	const toggleColorMode = useColorMode(state => state.toggleColorMode);
	const colorMode = useColorMode(state => state.colorMode);
	return (
		<Switch
			size="medium"
			sx={{
				width: 62,
				".MuiSwitch-switchBase": {
					"&.Mui-checked": {
						transform: "translate(23px, 0px)",
					},
					"&& .MuiTouchRipple-child": {
						backgroundColor: "blue",
					},
				},
			}}
			checked={colorMode}
			checkedIcon={
				<Box
					sx={{
						boxShadow: 1,
						borderRadius: 100,
						color: "hsl(225, 27%, 31%)",
						backgroundColor: "hsl(326, 100%, 74%)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Icon
						path={mdiMoonWaxingCrescent}
						size={0.8}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: 2.5,
						}}
					/>
				</Box>
			}
			icon={
				<Box
					sx={{
						boxShadow: 1,
						borderRadius: 100,
						color: "hsl(225, 27%, 31%)",
						backgroundColor: "hsl(60, 30%, 96%)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Icon
						path={mdiCheckboxBlankCircleOutline}
						size={0.8}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: 2.5,
						}}
					/>
				</Box>
			}
			onChange={() => {
				toggleColorMode();
			}}
		/>
	);
};

export default ToggleThemeComponent;
