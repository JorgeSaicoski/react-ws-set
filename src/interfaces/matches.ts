import { Set } from "./sets";

export interface Match {
    id: number,
    sets: Set[],
    isLive:boolean,
    win:boolean,
    matchDate: Date | string
    adversary: string
}