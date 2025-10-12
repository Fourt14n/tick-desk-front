import { create } from "zustand"

export interface UserInfo {
    teamId: number,
    enterpriseId: number
}

interface UserInfos {
    user: UserInfo | null
    setUser: (user : UserInfo) => void
    clearUser: () => void
}

export const useUserInfo = create<UserInfos>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null})
}));