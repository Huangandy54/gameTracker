import mongoose, { mongo } from "mongoose";

const teamSchema = mongoose.Schema({
    _id: Number,
    teamID : {type: Number, unique: true},
    teamName : String,
    teamTricode : String,
    wins : Number,
    losses : Number
});

const Team= mongoose.model('Team', teamSchema);

const gameSchema = mongoose.Schema({
    gameID: {type: Number, unique: true},
    gameStatus: Number,
    gameDate: String,
    gameCode: String,
    scheduledDateTimeUTC: {
        type: Date,
        default: Date.now()
    },
    weekNumber: Number,
    gameStatusText: String,
    ifNecessary: Boolean,
    seriesGameNumber: String,
    seriesText: String,
    homeTeam: Number,
    homeTeamName : String,
    homeTeamWins: Number,
    homeTeamLosses: Number,
    awayTeam: Number,
    awayTeamName : String,
    awayTeamWins: Number,
    awayTeamLosses: Number,
});



const gameSchedule = mongoose.model('gameSchedule', gameSchema);


export default gameSchedule;