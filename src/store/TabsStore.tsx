import { create } from 'zustand'


interface Tabs {
    tabs: Array<string>,
    addTab: (item: string) => void,
    // alterTab: (item: string) => void,
    // deleteTab: (item: string) => void
}

export const useTabs = create<Tabs>((set) => ({
    tabs: ["/Home", "Tickets/1", "Tickets/2"],
    addTab: (newTab) => set((state) => ({ tabs: state.tabs.includes(newTab) ? state.tabs : [...state.tabs, newTab] })),
}))