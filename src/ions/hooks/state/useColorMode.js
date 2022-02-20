import create from "zustand";

const useStore = create(set => ({
	colorMode: true,
	setColorMode: boolean => set({ colorMode: !boolean }),
}));

export default useStore;
