import axios from "axios";

import { Match } from "../interfaces/matches";

const API_URL = 'http://localhost:8080'

export const getMatches = () => axios.get<Match[]>(`${API_URL}/matches`);

export const getMatchesByID = (id:number) => axios.get<Match>(`${API_URL}/matches/${id}`);

export const createMatch = (matchData: Partial<Match>) => axios.post(`${API_URL}/matches`, matchData);

export const updateMatch = (id: number, matchData: Match) => axios.put(`${API_URL}/matches/${id}`, matchData);