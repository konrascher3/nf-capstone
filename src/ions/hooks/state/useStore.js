import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
	data: null,
	loading: false,
	error: null,
	coins: null,
	pageSize: null,
	open: false,

	setOpen: (open) => (
		set({ open: open })
	),
	initialPageSize: 20,
	setPageSize: (page) => (
		set({ pageSize: page })
	),
	setCoins: (data) => ({
		coins: data,
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
					coins: data,
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
