import Head from "next/head";
import React, { useState, useCallback } from "react";

import Layout from "/src/organisms/layout/index";

// react-hook-form
import { useForm } from 'react-hook-form'

// debounce
import debounce from 'debounce'

// MUI Import
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import { styled } from "@mui/material/"

// Material-design-icons Imports
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

// useStore
import useStore from "/src/ions/hooks/state/useStore"
import CoinsDataGrid from "../../molecules/coins-data-grid/DataGrid";

// Styled components
const RoundSearchField = styled(TextField)(() => ({
	display: "flex",
	flex: 1,
	color: "red",
	"& fieldset": {
		borderRadius: 9,
	},
	".MuiOutlinedInput-notchedOutline": {
		borderColor: "transparent",
	},
	".Mui-disabled .MuiOutlinedInput-notchedOutline": {
		borderColor: "transparent",
	},
}));




const Page = () => {
	const { handleSubmit } = useForm();

	const onSubmit = () => {
		console.log(`I am submitting: ${value}`);
		setValue("");
	}

	const handleDebounceFn = (input) => {
		console.log(`Fetching: ${input}`)
		// axios.post('/endpoint', {
		// 	value: inputValue,
		// }).then((res) => {
		// 	console.log(res.data);
		// });
	}

	const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

	const handleChange = (event_) => {
		const searchTerm = event_.target.value
		setValue(searchTerm);

		// Make input-validation
		setTimeout(() => {
			setInputError(false);
			setHelperText("");
			if (searchTerm.length === 0) {
				setInputError(false);
				setHelperText("");
			} else if (searchTerm.length < 3) {
				setInputError(true);
				setHelperText("Please provide at least 3 characters")
			} else {
				// If everything passes

				debounceFn(searchTerm);
			}
		}, 500)
	}

	const { loading, error } = useStore((state) => state);
	const [value, setValue] = useState("")
	const [inputError, setInputError] = useState(false)
	const [helperText, setHelperText] = useState("")

	return (
		<Layout>
			<Head>
				<title key="title">coin ghost</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>
			{loading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			<div>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					m: 3
				}}
				>
					<Paper
						elevation={1}
						component="form"
						sx={{
							p: "2px 4px",
							display: "flex",
							alignItems: "center",
							width: 350,
							borderRadius: 2.5,
						}}
						onSubmit={handleSubmit(onSubmit)}
					>
						<RoundSearchField
							type="input"
							error={inputError}
							label={helperText}
							disabled={false}
							variant="outlined"
							placeholder="Search Coins"
							inputProps={{ "aria-label": "search coins" }}
							size="small"
							value={value}
							onChange={(event_)=>{
								handleChange(event_)
							}}
						/>
						<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
						<IconButton
							disabled={inputError}
							type="submit"
							sx={{ p: '10px' }}
							aria-label="search"
						>
							<Icon path={mdiMagnify} size={1} title="Search coins"/>
						</IconButton>
					</Paper>
				</Box>

				{/*Data-grid component*/}
				<Box >
					<CoinsDataGrid />
				</Box>
			</div>
		</Layout>
	);
};

export default Page;
