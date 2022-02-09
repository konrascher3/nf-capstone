import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import merge from "deepmerge";

const useStore = create(
	persist(
		(set) => ({
			detailData: null,
			loading: false,
			error: null,
			coins: null,
			pageSize: null,
			open: false,
			meta: {},
			articles: null,
			timeFrame: 7,
			interval: "daily",
			tabPosition: 0,
			setTabPosition: (index) => (
				set({ tabPosition: index })
			),
			setTimeFrame: (days) => (
				set({ timeFrame: days })
			),
			setInterval: (interval) => (
				set({ interval: interval })
			),
			setArticles: (array) => (
				set({ articles: array })
			),
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
			setLoading: (loading) => set({ loading }),
			setSearchDataIds: (array) => set({ searchDataIds: array }),
			fetchData: (url, key) => {
				axios
					.get(url)
					.then(({ data }) => {
						set({
							error: null,
							[key]: data,
							loading: false,
						});
					})
					.catch(error => {
						set(() => ({
							error,
							loading: false
						}));
					});
			},
		}) ,{name: "coin-ghost"}))

export default useStore
