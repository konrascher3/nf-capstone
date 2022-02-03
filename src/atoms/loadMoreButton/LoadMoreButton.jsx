import React from "react";

// MUI Import
import LoadingButton from "@mui/lab/LoadingButton";

// useStore
import useStore from "../../ions/hooks/state/useStore";

const LoadMoreButton = () => {
	const { loading, coins } = useStore((state) => state);
	const pageSize = useStore((state) => state.pageSize);
	const setPageSize = useStore((state) => state.setPageSize);


	return (
		<LoadingButton loading={loading} disabled={pageSize === 100 || pageSize >= coins.length} onClick={()=>{setPageSize(pageSize + 10)}}>
			load more
		</LoadingButton>
	)
}

export default LoadMoreButton
