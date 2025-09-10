import { create } from 'zustand'


interface Tabs {
    tabs: Array<string>,
    addTab: (item: string) => void,
    deleteTab: (item: string) => void
}

export const useTabs = create<Tabs>((set) => ({
    tabs: ["/Home", "/Ticket/21", "/Ticket/2"],
    addTab: (newTab) => set((state) => ({ tabs: state.tabs.includes(newTab) ? state.tabs : [...state.tabs, newTab] })),
    deleteTab: (tabToRemove) => set((state) => ({tabs: state.tabs.filter(prev => prev !== tabToRemove)}))
}))