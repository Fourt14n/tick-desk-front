import { create } from "zustand"
import { persist } from 'zustand/middleware';

export interface UserInfo {
    id: number,
    username: string,
    teamId: number,
    enterpriseId: number
}

interface UserInfos {
    user: UserInfo | null
    setUser: (user : UserInfo) => void
    clearUser: () => void
}

export const UserInfo = create<UserInfos>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null })
        }),
        {
            name: 'user-storage', // nome da chave no localStorage
        }
    )
);