import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import debounce from "debounce";
import React, { useCallback, useState } from "react";

// MUI Imports
import Icon from "@mdi/react";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/"

// useStore
import useStore from "/src/ions/hooks/state/useStore"

// Material-design-icons Imports
import {  mdiMagnify } from "@mdi/js";
import { useForm } from "react-hook-form";

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
		border: "none"
	},
}));


const Searchbar = () => {
	const { handleSubmit } = useForm();
	const setLoading = useStore((state) => state.setLoading);
	const setCoins = useStore((state) => state.setCoins);
	const loading = useStore((state) => state.loading);
	const [value, setValue] = useState("")
	const [inputError, setInputError] = useState(false)
	const [helperText, setHelperText] = useState(undefined)

	const onSubmit = () => {
		handleDebounceFn;
	}

	const handleDebounceFn = async (searchTerm) => {

		// Make input-validation
		if (searchTerm.length === 0) {
			// Resets errors if search field is empty
			setInputError(false);
			setHelperText(undefined);
		} else if (searchTerm.length < 3) {
			// Error if term has less than 3 characters
			setInputError(true);
			setHelperText("Please provide at least 3 characters")
		} else if (/^[A-Za-z0-9]+$/.test(searchTerm) === false) {
			// Error if term contains invalid characters
			setInputError(true);
			setHelperText("Please provide valid characters")
		} else {
			// If everything passes, make search
			setLoading(true)
			const { data } = await axios.get(`https://api.coingecko.com/api/v3/search?query=${searchTerm}`);
			if (data?.coins.length){
				const fetchData = async () => {
					const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets",
						{ params:
								{
									vs_currency: "usd",
									ids: data.coins.map(({ id }) => id).join(",")
								}
						});
					setCoins(response.data);
					setLoading(false)
				};
				fetchData()
			} else {
				setLoading(false)}
		}
	}

	const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

	const handleChange = (event_) => {
		const searchTerm = event_.target.value
		setValue(searchTerm);
		debounceFn(searchTerm);
		// Reset errors
		setInputError(false);
		setHelperText(undefined);
	}
	return (

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
				disabled={loading}
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
			{loading ? <CircularProgress style={{padding: "10px",  margin: 0}} /> :
			<IconButton
				disabled={inputError}
				type="submit"
				sx={{ p: "10px" }}
				aria-label="search"
			>
				<Icon path={mdiMagnify} size={1} title="Search coins" />
			</IconButton>}
		</Paper>
	)
}

export default Searchbar
