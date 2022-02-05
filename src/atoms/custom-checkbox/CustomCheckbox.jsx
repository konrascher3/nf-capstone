import React from "react";

// MUI Import
import Box from "@mui/material/Box";

// useStore
import useStore from "/src/ions/hooks/state/useStore";


const CustomCheckbox = ({ params  }) => {
	const meta = useStore((state) => state.meta);
	const toggleFavorited = useStore((state) => state.toggleFavorited);
	const metaData = meta[params.id];
	const favorited = metaData?.favorited;

	return (
		<label>
			{/*Checkbox-component*/}
			<input
				type="checkbox"
				style={{
					backgroundColor: "green",
					position: "fixed",
					top: "-100%",
					left: "-100vw"
				}} onChange={()=>{
				toggleFavorited(params.id)
				// console.log(meta[params.id].favorited)
				}}
			/>
			{/*Increase tap-target*/}
			<div style={{
				height: 51,
				width: 51,
				position: "absolute",
				bottom: -16,
				left: -10 }}
			>
				{/*Represents the custom-checkbox*/}
				<Box sx={{
					height:51,
					width: 5,
					backgroundColor: favorited ? "#BD93F9" : "#BD93F966",
					position: "absolute",
					top: -.5 }}
				/>
			</div>
		</label>
	)
}

export default CustomCheckbox
