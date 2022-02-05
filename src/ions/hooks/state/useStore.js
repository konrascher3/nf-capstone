import create from "zustand";
import axios from "axios";
import merge from "deepmerge";

const useStore = create((set) => ({
	data: null,
	loading: false,
	error: null,
	coins: null,
	pageSize: null,
	open: false,
	meta: {},
	toggleFavorited: (id) => {
		set((state) => ({
			meta: merge(state.meta, {
				[id]: { favorited: !state.meta[id]?.favorited },
			}),
		}));
	},
	setOpen: (open) => (
		set({ open: open })
	),
	initialPageSize: 20,
	setPageSize: (page) => (
		set({ pageSize: page })
	),
	setCoins: (data) => (
		set({ coins: data })
	),
	setUrl: (url) => ({
		url: url
	}),
	setLoading: (loading) => set({ loading: loading }),
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
