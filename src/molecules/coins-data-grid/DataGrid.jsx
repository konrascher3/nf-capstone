import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";

// MUI Import
import { DataGrid } from "@mui/x-data-grid"
import Box from "@mui/material/Box"

// Custom-components Imports
import DataGridColumns from "/src/ions/data-grid-columns/DataGridColumns"

// useStore
import useStore from "/src/ions/hooks/state/useStore"


const CoinsDataGrid = () => {
	const error = useStore((state) => state.error);
	const coins = useStore((state) => state.coins);
	const loading = useStore((state) => state.loading);
	const initialPageSize = useStore((state) => state.initialPageSize);
	const setPageSize = useStore((state) => state.setPageSize);
	const pageSize = useStore((state) => state.pageSize);

	// Reset page-size if category switches
	useEffect(()=>{
			setPageSize(initialPageSize)},
		[initialPageSize, setPageSize]
	)

	console.log("Grid:", coins)
	console.log(coins)
	console.log(coins)

	return (
		<>

			{error && <Typography variant="caption">{error.message}</Typography>}
			{coins &&
				<>
					<Box sx={{ display: "flex", mx: .5, alignItems: "center", justifyContent: "center" }}>
						<DataGrid
							disableSelectionOnClick
							disableColumnSelector
							disableDensitySelector
							disableColumnFilter
							disableColumnMenu
							hideFooter
							autoHeight
							pageSize={pageSize}
							rows={coins}
							columns={DataGridColumns}
							loading={loading}
							density="standard"
							headerHeight={35}
							sx={{".MuiDataGrid-columnSeparator": {
									visibility: "hidden",
								},
								".MuiDataGrid-cell": {
									position: "relative",
									overflow: "visible"
								},
								".MuiDataGrid-cell:focus-within": {
									outline: "none !important"
								},
								width: "98%"
							}}
							onPageSizeChange={(newPage) => setPageSize(newPage)} />
					</Box>
				</>}

		</>
	)
}

export default CoinsDataGrid
