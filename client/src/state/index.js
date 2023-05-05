import { createSlice } from "@reduxjs/toolkit";

//global state
const initialState = {
    mode: "light",
    schedule: [],
    liveGames: {},
    pastGames: {},
    date: new Date().toISOString(),
}

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setMode: (state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setDate: (state, action)=>{
            state.date= action.payload.date;
        },
        setSchedule: (state, action) =>{
            state.schedule= action.payload.schedule;
        },
        updatePastGame: (state, action) =>{
            const gameID= action.payload.gameID;
            const updatedGame = action.payload.game;
            state.pastGames = {
                ...state.pastGames,
                [gameID]: updatedGame
            };
        },
        updateLiveGame: (state,action)=>{
            const gameID= action.payload.gameID;
            const updatedGame = action.payload.game;
            state.liveGames = {
                ...state.liveGames,
                [gameID]: updatedGame
            };
        },
    }
});

export const { setMode, setSchedule , updatePastGame, setDate, updateLiveGame} = mainSlice.actions;
export default mainSlice.reducer;