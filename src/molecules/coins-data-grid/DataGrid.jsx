import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";

// MUI Import
import { DataGrid } from "@mui/x-data-grid"

// Custom-components Imports
import DataGridColumns from "/src/ions/data-grid-columns/DataGridColumns"

// useStore
import useStore from "/src/ions/hooks/state/useStore"


const CoinsDataGrid = () => {
	const {
		data,
		loading,
		error,
		coins,
		initialPageSize,
		setPageSize,
		pageSize
	} = useStore((state) => state)

	// Reset page-size if category switches
	useEffect(()=>{
			setPageSize(initialPageSize)},
		[data, initialPageSize, setPageSize]
	)

	return (
		<>
			{error && <Typography variant="caption">{error.message}</Typography>}
			{data &&
				<DataGrid
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
						m: .5,
					}}
					onPageSizeChange={(newPage) => setPageSize(newPage)} />}
		</>
	)
}

export default CoinsDataGrid
