import React from "react";

// MUI Imports
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";

// Material Design Icons Imports
import Icon from "@mdi/react";
import { mdiChevronUp } from "@mdi/js";

const ScrollTop = props => {
	const { window, children } = props;

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 550,
	});

	const handleClick = () => {
		const anchor = document.querySelector("#back-to-top-anchor");

		if (anchor) {
			anchor.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				role="presentation"
				sx={{ position: "fixed", bottom: 40, right: 16 }}
				onClick={handleClick}
			>
				{children}
			</Box>
		</Zoom>
	);
};

const BackToTopButton = () => {
	return (
		<ScrollTop>
			<Fab size="small" color="primary" aria-label="back-to-top">
				<Icon path={mdiChevronUp} size={1.25} color="hsl(231, 15%, 18%)" />
			</Fab>
		</ScrollTop>
	);
};

export default BackToTopButton;
