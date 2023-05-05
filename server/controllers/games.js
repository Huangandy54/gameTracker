import gameMesssage from "../models/gameMessage.js";
import axios from "axios";
import { get } from "mongoose";

const scheduleLink =
  "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_2.json";


/**
 * 
 * req.params.reqDate optional
 * gets nba schedule for either today's date or if provided, the requested date
 * returns json of games
 */
export const getGames = async (req, res) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let todaysDate= new Date();
    let requestedDate=req.params.reqDate;
    console.log(`requested date: ${requestedDate}`);
    //console.log(todaysDate.setDate(todaysDate.getDate()+1));
    /**
     * TODO if needed: find next available game if no game on current day but not if specific day is requested
     * todaysDate.setDate(todaysDate.getDate()+1);
    **/
  try {
    const gameMessages = await gameMesssage.find({
      gameDate: requestedDate || todaysDate.toLocaleDateString("en-ca"),
      //ifNecessary: false
    });
    res.status(200).json(gameMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createGame = async (req, res) => {
  console.log("insert");
  console.log(`req: ${JSON.stringify(req.body)}`);
  const game = req.body;
  console.log(`game info: ${JSON.stringify(game)}`);
  //accepts object
  const newGame = new gameMesssage(game);
  try {
    await newGame.save();

    res.status(201).json(newGame);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  //   res.send("Added");
};

/*
Today's games: url
https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json
Box score of game number:
https://cdn.nba.com/static/json/liveData/boxscore/boxscore_0022200238.json
*/
/*
loops through schedule and add to database
var numDates is total number of dates in the schedule

*/
const getSchedule = async () => {
  console.log("getSchedule");
    return new Promise((resolve, reject)=>{
      axios
        .get(scheduleLink)
        .then(async function (response) {
          //console.log(response.data);
          await addSchedule(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          reject(`${error}`);
        })
        .then(function () {
          console.log("added schedule to db");
          resolve(`success`)
        });
    })

};

const addSchedule = async (schedule) => {
  let numDates = schedule[`leagueSchedule`][`gameDates`].length;
  //loop through days
  for (let date = 0; date < numDates; date++) {
    //loop through games of the days
    let numGames =
      schedule[`leagueSchedule`][`gameDates`][date][`games`].length;
    for (let gameNum = 0; gameNum < numGames; gameNum++) {
      let tempObj = {
        gameID : schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum].gameId,
        gameStatus : schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum].gameStatus,
        gameDate : schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum].gameDateUTC
          .split("T")[0]
          .toString(),
        gameCode : 
          schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .gameCode,
        scheduledDateTimeUTC :
          schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .gameDateTimeUTC,
        weekNumber :
          schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .weekNumber,
        gameStatusText :
          schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .gameStatusText,
        ifNecessary: schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
        .ifNecessary,
        seriesGameNumber: schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
        .seriesGameNumber,
        seriesText: schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
        .seriesText,
        homeTeam :
          schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .homeTeam.teamId,
        awayTeam :
          schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .awayTeam.teamId,
        homeTeamName :
            [schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .homeTeam.teamCity,schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
              .homeTeam.teamName].join(' '),
        homeTeamWins :
        schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
          .homeTeam.wins,
        homeTeamLosses :
        schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
          .homeTeam.losses,
        awayTeamName :
            [schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
            .awayTeam.teamCity,schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
              .awayTeam.teamName].join(' '),
        awayTeamWins :
        schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
          .awayTeam.wins,
        awayTeamLosses :
        schedule[`leagueSchedule`][`gameDates`][date][`games`][gameNum]
          .awayTeam.losses,
      };
      const newGame = new gameMesssage(tempObj);
      try {
        //try to save new game
        await newGame.save();

      } catch (error) {
        //game exists
        if(error.code==11000){
          //update game details
          try {
            await gameMesssage.updateOne({gameID: newGame.gameID}, {$set: tempObj});
          } catch (error) {
            console.log(error.message)
          }
          
        }
      }
    }
  }
};


export const updateSchedule= async (req, res) =>{
    await getSchedule().then(()=>{
      res.send('updated');
    
    }).catch((error)=>{
      console.log(error.message)
      res.sendStatus(500);
    })
};


/**
 * code to get specific data from nba api with header. 
 * 
 * 
 */

// const getTeamData = async ()=>{
//   let link = 'https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision='
//   console.log('teamData')
//   const response = await fetch(link, {
//     method: 'GET',
//     headers : {
//       'Accept': '*/*',
//       'Accept-Encoding': 'gzip, deflate, br',
//       'Accept-Language': 'en-US,en;q=0.9',
//       'Connection': 'keep-alive',
//       'Host': 'stats.nba.com',
//       'Origin': 'https://www.nba.com',
//       'Referer': 'https://www.nba.com/',
//       'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//       'sec-ch-ua-mobile': '?0',
//       'sec-ch-ua-platform': '"Windows"',
//       'Sec-Fetch-Dest': 'empty',
//       'Sec-Fetch-Mode': 'cors',
//       'Sec-Fetch-Site':' same-site',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 '
//     }
//   });
//   const data= await response.json();
//   console.log(data.resultSets[0].rowSet);
// }

/*
players that are out with explainations
https://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player


end point daily lineups 
https://stats.nba.com/js/data/leaders/00_daily_lineups_20230111.json

*/

/**
 * MLB
 * 
 * https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-schedule?stitch_env=prod&sortTemplate=5&sportId=1&&sportId=51&startDate=2023-04-04&endDate=2023-04-04
 */