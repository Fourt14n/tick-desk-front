export type CountCallsByUrgency = {
    urgencias: CallsByUrgency[]
}

export type CallsByUrgency = {
    urgency: string,
    totalChamados: number
}