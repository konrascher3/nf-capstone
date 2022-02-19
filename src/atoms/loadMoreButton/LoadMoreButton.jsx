import React from "react";

// MUI Import
import LoadingButton from "@mui/lab/LoadingButton";

// useStore
import useStore from "/src/ions/hooks/state/useStore";

const LoadMoreButton = () => {
	const loading = useStore(state => state.loading);
	const coins = useStore(state => state.coins);
	const pageSize = useStore(state => state.pageSize);
	const setPageSize = useStore(state => state.setPageSize);
	const colorMode = useStore(state => state.colorMode);

	return (
		<LoadingButton
			loading={loading}
			color={colorMode ? "primary" : "secondary"}
			disabled={pageSize === 100 || pageSize >= coins?.length}
			onClick={() => {
				setPageSize(pageSize + 10);
			}}
		>
			load more
		</LoadingButton>
	);
};

export default LoadMoreButton;
