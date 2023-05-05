import { Box, Typography, Divider } from "@mui/material";
import GameCountDown from "./GameCountDown";
import { useState } from "react";
import { useSelector } from "react-redux";
import TeamImage from "components/TeamImage";
import ScoreBoard from "./ScoreBoard";



const Overview = ({
    gameID, gameStatus, gameDate, scheduledDateTimeUTC, ifNecessary, seriesGameNumber, seriesText, homeTeam, homeTeamName, awayTeam, awayTeamName, awayTeamWins, awayTeamLosses, homeTeamWins, homeTeamLosses
}) =>{
    const [isLive, setIsLive]= useState(gameStatus===2);
    const [pastGame, setPastGame] = useState(gameStatus===3);
    const data= useSelector((state) => 
    gameStatus===3 ? 
        state.pastGames[gameID] 
        : 
        state.liveGames[gameID]);
    return(

        <>

        {/* START TIME */}
        <Box sx={{
            display: 'flex',
            alignItems:'center',
            justifyContent: 'flex-end',
            height:'40px',
            flexDirection:'column'
            }}>
            <Box sx={{width:'100%', height:'25px'}}>
                <Typography variant="h4">
                {new Date(scheduledDateTimeUTC).toLocaleTimeString("en-us", {hour:'numeric', minute: '2-digit'})}
                </Typography>
            </Box>
        </Box>
        {pastGame&&(<Typography color='red'>FINAL</Typography>)}
        {/* Countdown to game or in game time only if game is present or future */}
        {pastGame===false&&(<GameCountDown startTime={scheduledDateTimeUTC} gameID={gameID}/>)}

        <Divider flexItem={true} />

        {/* Logo + Score + Logo */}
        <Box sx={{
            display:'flex',
            justifyContent: 'space-between',
            width:'100%',
            minHeight:'175px'
        }}>
            {/* Team Info Component */}
            <TeamImage teamName={awayTeamName}teamID={awayTeam} winLoss={awayTeamWins+'-'+awayTeamLosses}/>
            
            {data!==undefined &&(<ScoreBoard gameID={gameID} pastGame={pastGame}/>)}

            <TeamImage teamName={homeTeamName} teamID={homeTeam} winLoss={homeTeamWins+'-'+homeTeamLosses}/>
        </Box>
        
        <Box>
            {seriesGameNumber+' '+seriesText} {ifNecessary? 'TBD (If Necessary)' : '' }</Box>
        {/* Player Status 
        <Box>
            <PlayerStatus/>
        </Box>
        */}

        </>
    )

}

export default Overview;