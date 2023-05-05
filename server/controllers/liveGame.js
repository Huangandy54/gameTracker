import axios from "axios";
import gameDetails from "../models/gameDetailsModel.js";
import gameMesssage from "../models/gameMessage.js";
import {redisKeys, redisGet, redisSet, redisDelete} from '../redis/redis-client.js'
/**
 * input nba json
 * process relevant information from json
 * returns array
 */

const processBoxScore = async (data) => {
    //console.log(data);
    let condensedData={
        //data[0] game info
        gameID : data.gameId,
        gameDate: data.gameTimeLocal.split("T")[0].toString(),
        gameStatus : data.gameStatus, 
        gameStatusText : data.gameStatusText, 
        homeTeamName : [data.homeTeam.teamCity ,data.homeTeam.teamName].join(' '), 
        homeTeamID : data.homeTeam.teamId,
        homeScore : data.homeTeam.score,
        awayTeamName : [data.awayTeam.teamCity ,data.awayTeam.teamName].join(' '),
        awayTeamID : data.awayTeam.teamId,
        awayScore : data.awayTeam.score,
        homeTeamPlayers: [],
        awayTeamPlayers: []
    }
        //data[1]=homeTeam box score
        //data.homeTeam.players,
        //data[2]=awayTeam box score
        //data.awayTeam.players,
    ;
    data.homeTeam.players.forEach(element => {
        condensedData.homeTeamPlayers.push({
            status : element.status,
            name : element.name,
            jerseyNum : element.jerseyNum,
            position : element.position,
            onCourt: element.oncourt,
            minutes : element.statistics.minutes.substr(2).replace("M",":").replace("S",""),
            points : element.statistics.points,
            reboundsDef : element.statistics.reboundsDefensive,
            reboundsOff : element.statistics.reboundsOffensive,
            reboundsTotal : element.statistics.reboundsTotal,
            assists : element.statistics.assists,
            blocks : element.statistics.blocks,
            steals : element.statistics.steals,
            turnovers : element.statistics.turnovers,
            fieldGoalsMade : element.statistics.fieldGoalsMade,
            fieldGoalsAttempts : element.statistics.fieldGoalsAttempted,
            threePointersAttempted : element.statistics.threePointersAttempted,
            threePointersMade : element.statistics.threePointersMade,
            freeThrowsAttempted : element.statistics.freeThrowsAttempted,
            freeThrowsMade : element.statistics.freeThrowsMade,
            personalFouls : element.statistics.foulsPersonal,
            plusMinusPoints : element.statistics.plusMinusPoints
        });
    });
    data.awayTeam.players.forEach(element => {
        condensedData.awayTeamPlayers.push({
            status : element.status,
            name : element.name,
            jerseyNum : element.jerseyNum,
            position : element.position,
            onCourt: element.oncourt,
            minutes : element.statistics.minutes.substr(2).replace("M",":").replace("S",""),
            points : element.statistics.points,
            reboundsDef : element.statistics.reboundsDefensive,
            reboundsOff : element.statistics.reboundsOffensive,
            reboundsTotal : element.statistics.reboundsTotal,
            assists : element.statistics.assists,
            blocks : element.statistics.blocks,
            steals : element.statistics.steals,
            turnovers : element.statistics.turnovers,
            fieldGoalsMade : element.statistics.fieldGoalsMade,
            fieldGoalsAttempts : element.statistics.fieldGoalsAttempted,
            threePointersAttempted : element.statistics.threePointersAttempted,
            threePointersMade : element.statistics.threePointersMade,
            freeThrowsAttempted : element.statistics.freeThrowsAttempted,
            freeThrowsMade : element.statistics.freeThrowsMade,
            personalFouls : element.statistics.foulsPersonal,
            plusMinusPoints : element.statistics.plusMinusPoints
        });
    });
    return condensedData;
};

export const addGameToMongo = async(gameID) =>{
    let nbaURL = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_00${gameID}.json`;
    try {
        console.log(gameID);
        const response = await axios.get(nbaURL)
        if(response.data.game.gameID===null){
            return;
        }
        const processedData = await processBoxScore(response.data.game);
        const newGame = new gameDetails(processedData);

        try {
            //try to save new game
            await newGame.save();
    
        }catch (error) {
            //game exists
            if(error.code==11000){
              //update game details
              try {
                await gameDetails.updateOne({gameID: newGame.gameID}, {$set: processedData});
              } catch (error) {
                console.log(error.message)
              }
            }
        }
    } catch (error) {
       console.log(error);
    }    
};

const addAll = async () =>{
    try {
        const gameMessages = await gameMesssage.find({
        });
        gameMessages.map((a)=>{
            if(a.gameStatusText==='Final' ||a.gameStatusText==='Final/OT'){
                addGameToMongo(a.gameID);
            }
        })
      } catch (error) {
        console.log('add all')
        console.log(error.message);
      }
}
const pastGameCheck = async (gameID) => {
    let query;
    try {
        query = await gameDetails.find({ gameID: gameID });
        return query;
    } catch (error) {
      console.log(error.message);
    }
}


// calls nba api to get current game data
const getLiveGameData = async (gameID) =>{
    let nbaURL = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_00${gameID}.json`;
    return axios
    .get(nbaURL)
    .then(async (response)=>{
            const processedData = await processBoxScore(response.data.game);
            console.log('returning data')
            return processedData;
        }
    ).catch((error)=>{
        console.log(`Error finding game with id: ${gameID}`);
        console.log(error)
    });
};

//endpoint function for live game 
export const getLiveGame= async (req, res) =>{
    let gameID = req.params.gameID;

    try {
        getLiveGameData(gameID).then((data)=>{
            //game is over. add to past game DB.
            if(data.gameStatus===3){
                console.log('game over adding to DB');
                let fixedGameID = data.gameID.substring(2);
                addGameToMongo(fixedGameID);
            }
            res.send(data);
        })
    } catch (error) {
        //console.log(error.response)
    }

}

export const getDetailedGame = async (req, res) => {
    let gameID = req.params.gameID;
    //determines if in past games DB. if so return DB data else return live data
    let pastGame= await pastGameCheck(gameID);
    if(pastGame.length!==0){
         res.send(pastGame[0])
    }else{
        console.log(`gameID: ${gameID} is not in DB`)
    }
};

const test = async (req) => {
    let gameID = req;
    let liveGame = await redisGet(gameID);
    //currently live
    if(liveGame){
        console.log('live');
        const data = await getLiveGame(gameID);
        console.log(data);
        await redisSet(gameID, data);
        return data; //res.send(data);
    }else //not live
    {
        let pastGame= await pastGameCheck(gameID);
        //check if past game if so return past game data
        if(pastGame.length!==0){
            return pastGame[0];//res.send(pastGame[0])
        }else{
            console.log('setting the game live');
            const data = await getLiveGame(gameID);
            await redisSet(gameID, data);
            return data; //res.send(data);
        }
    }
    
};

