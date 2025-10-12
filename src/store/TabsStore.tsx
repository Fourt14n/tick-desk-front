import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Tabs {
    tabs: Array<string>,
    addTab: (item: string) => void,
    deleteTab: (item: string) => void
}

export const useTabs = create<Tabs>()(
    persist(
        (set) => ({
            tabs: ["/Home"],
            addTab: (newTab) => set((state) => ({ tabs: state.tabs.includes(newTab) ? state.tabs : [...state.tabs, newTab] })),
            deleteTab: (tabToRemove) => set((state) => ({ tabs: state.tabs.filter(prev => prev !== tabToRemove) }))
        }),
        {
            name: 'user-storage', // nome da chave no localStorage
        }
    )
);