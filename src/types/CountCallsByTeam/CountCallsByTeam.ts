export type CountCallsByTeam = {
    time: CallsByTeam[]
}

export type CallsByTeam ={
    teamId: number,
    teamName: string,
    totalChamados :number
}