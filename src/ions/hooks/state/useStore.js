import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
	data: null,
	loading: false,
	error: null,
	endpoint: "",
	url:"",
	setCoins: (data) => ({
		data,
		error: null,
		loading: true,
	}),
	setUrl: (url) => ({
		url: url

	}),
	fetchData: (url) => {
		axios
			.get(url)
			.then(({ data }) => {
				set({
					error: null,
					data,
					loading: false,
				});
			})
			.catch(error => {
				set(({ data }) => ({
					data,
					error,
					loading: false,
				}));
			});
	}
}))

export default useStore