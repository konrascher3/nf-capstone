// MUI Import
import { styled } from "@mui/material/";

export const StyledRankColumn = styled("div")({
	position: "absolute",
	inset: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
})

export const StyledNameColumn = styled("div")({
	display: "grid",
	gap: 10,
	gridTemplateColumns: "25px 1fr"
})
