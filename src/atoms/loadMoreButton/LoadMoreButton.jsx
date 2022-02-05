import React from "react";

// MUI Import
import LoadingButton from "@mui/lab/LoadingButton";

// useStore
import useStore from "/src/ions/hooks/state/useStore";


const LoadMoreButton = () => {
	const {
		loading,
		coins,
		pageSize,
		setPageSize
	} = useStore((state) => state);

	return (
		<LoadingButton loading={loading} disabled={pageSize === 100 || pageSize >= coins?.length} onClick={()=>{setPageSize(pageSize + 10)}}>
			load more
		</LoadingButton>
	)
}

export default LoadMoreButton
