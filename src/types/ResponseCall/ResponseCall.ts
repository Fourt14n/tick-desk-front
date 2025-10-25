import type { ResponseTeams } from "../ResponseTeams/ResponseTeams"
import type { ResponseUser } from "../ResponseUser/ResponseUser"

export type ResponseCall = {
    id: number,
    numberCall: number,
    title: string,
    teamName: string,
    urgency: string,
    status: boolean,
    previsaoSolucao: Date,
    team: ResponseTeams,
    userExternoId: number,
    userResponsavel: ResponseUser
    dataAbertura: Date
}