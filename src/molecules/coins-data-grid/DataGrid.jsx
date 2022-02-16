import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

// MUI Import
import { DataGrid } from "@mui/x-data-grid";

// Custom-components Imports
import DataGridColumns from "/src/ions/data-grid-columns/DataGridColumns";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const CoinsDataGrid = () => {
	const error = useStore(state => state.error);
	const coins = useStore(state => state.coins);
	const loading = useStore(state => state.loading);
	const initialPageSize = useStore(state => state.initialPageSize);
	const setPageSize = useStore(state => state.setPageSize);
	const pageSize = useStore(state => state.pageSize);
	const meta = useStore(state => state.meta);

	const loggedIn = useStore(state => state.loggedIn);

	// Reset page-size if category switches
	useEffect(() => {
		setPageSize(initialPageSize);
	}, [initialPageSize, setPageSize]);

	useEffect(() => {
		// Update remote favorites with local ones
		const authToken = Cookies.get("coin-ghost-auth");
		if (authToken && loggedIn) {
			const options = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};
			axios.post("/api/favorites/put", { favorites: meta }, options);
		}
	}, [meta]);

	return (
		<>
			{error && <Typography variant="caption">{error.message}</Typography>}
			{coins && (
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
					sx={{
						".MuiDataGrid-columnSeparator": {
							visibility: "hidden",
						},
						".MuiDataGrid-cell": {
							position: "relative",
							overflow: "visible",
						},
						".MuiDataGrid-cell:focus-within": {
							outline: "none !important",
						},
						// mx: 0.5,
						width: "100%",
					}}
					onPageSizeChange={newPage => setPageSize(newPage)}
				/>
			)}
		</>
	);
};

export default CoinsDataGrid;
