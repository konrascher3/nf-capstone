import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
	persist(
		(set, get) => ({
			colorMode: true,
			toggleColorMode: () => {
				const colorMode = get().colorMode;
				set({ colorMode: !colorMode });
			},
		}),
		{ name: "coin-ghost-colorMode" }
	)
);

export default useStore;
