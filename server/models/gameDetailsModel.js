import mongoose, { mongo } from "mongoose";

const detailedSchema = mongoose.Schema({
    gameID: {type: Number, unique: true},
    gameDate: String,
    gameStatus: Number,
    gameStatusText: String,
    homeTeamName : String,
    homeTeamID : Number,
    homeScore : String,
    awayTeamName : String,
    awayTeamID : Number,
    awayScore : String,
    homeTeamPlayers: [],
    awayTeamPlayers: []

});


const gameDetails = mongoose.model('gameDetails', detailedSchema);

export default gameDetails;