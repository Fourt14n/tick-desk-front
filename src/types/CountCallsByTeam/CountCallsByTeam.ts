export type CountCallsByTeam = {
    times: CallsByTeam[]
}

export type CallsByTeam ={
    teamId: number,
    teamName: string,
    totalChamados :number
}