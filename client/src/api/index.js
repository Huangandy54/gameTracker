import axios from 'axios';

const url= 'https://game-tracker-dev-api.vercel.app/';

export const fetchGames = (date)=> axios.get(`${url}date/${date||""}`);

export const fetchBoxScore = (gameID) => axios.post(`${url}game/${gameID}`);
