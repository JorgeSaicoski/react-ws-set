import axios from "axios";

import { Match } from "../interfaces/matches";

interface MatchesResponse {
    count: number;
    matches: Match[];
  }

const API_URL = 'http://localhost:8080'

export const getMatches = () => {
    return axios.get<MatchesResponse>(`${API_URL}/matches`).then(response => response.data);
};

export const getMatchesByID = (id:number) => axios.get<Match>(`${API_URL}/matches/${id}`);

export const createMatch = (matchData: Partial<Match>) => axios.post(`${API_URL}/matches`, matchData);

export const updateMatch = (id: number, matchData: Match) => axios.put(`${API_URL}/matches/${id}`, matchData);