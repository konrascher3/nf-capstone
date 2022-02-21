import React from "react";

// MUI Import
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const CustomCheckbox = ({ params }) => {
	const meta = useStore(state => state.meta);
	const toggleFavorited = useStore(state => state.toggleFavorited);

	return (
		<label>
			{/*Checkbox-component*/}
			<input
				type="checkbox"
				style={{
					position: "fixed",
					top: "-100%",
					left: "-100vw",
				}}
				onChange={() => {
					toggleFavorited(params.id);
				}}
			/>
			{/*Increase tap-target*/}
			<div
				style={{
					height: 51,
					width: 51,
					cursor: "pointer",
					position: "absolute",
					bottom: -14,
					left: -10,
				}}
			>
				{/*Represents the custom-checkbox*/}
				<Box
					sx={{
						height: 51,
						width: 5,
						backgroundColor: meta[params.id] ? "#BD93F9" : "#BD93F966",
						position: "absolute",
						top: -0.5,
						transitionDuration: "4s",
						transition: "background-color .25s",
					}}
				/>
			</div>
		</label>
	);
};

export default CustomCheckbox;
