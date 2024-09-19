import { Set } from "./sets";

export interface Match {
    ID: number,
    Sets: Set[],
    IsLive:boolean,
    Win:boolean,
    MatchDate: Date | string
    Adversary: string
}