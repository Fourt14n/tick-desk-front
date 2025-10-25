import type { ResponseCall } from "../ResponseCall/ResponseCall"
import type { ResponseUser } from "../ResponseUser/ResponseUser"

export enum EStatusAction {
    PUBLIC = "PUBLIC",
    PRIVAT = "PRIVAT"
}

export type ResponseAction = {
id: number,
description: string,
data: Date,
user: ResponseUser,
call: ResponseCall
statusAction: EStatusAction
}