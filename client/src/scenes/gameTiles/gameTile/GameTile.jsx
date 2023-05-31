import { Box, useTheme } from "@mui/material";

import {useState } from "react";

import Overview from "./Overview";
import Detailed from "./Detailed/Detailed";

const GameTile = ({
    gameID,
    gameStatus,
    gameDate,
    scheduledDateTimeUTC,
    ifNecessary,
    seriesGameNumber,
    seriesText,
    homeTeam,
    homeTeamName,
    awayTeam,
    awayTeamName,
    awayTeamWins,
    awayTeamLosses,
    homeTeamWins,
    homeTeamLosses,
    onClick,
}) => {
    const [flip,setFlip] = useState(false);
    const theme = useTheme();
    // const {palette} = useTheme();
    // const primary= palette.primary.main;
    // const main = palette.neutral.main;
    // const medium = palette.neutral.medium;
    
    const alt = theme.palette.background.alt;
    
    const handleClick = ()=>{
        setFlip(!flip)
    }


    return(
        <Box onClick={()=>{handleClick()}} sx={{
            
            backgroundColor:alt, 
            display:"flex",
            width: 'auto',
            minHeight:'300px',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems: 'center',
            p:'0rem 1rem 1rem 1rem',
            borderRadius:'25px'
            }}>
            
            {!flip ? 
                (<Overview {...{gameID, gameStatus, gameDate, scheduledDateTimeUTC, ifNecessary, seriesGameNumber, seriesText, homeTeam, homeTeamName, awayTeam, awayTeamName, awayTeamWins, awayTeamLosses, homeTeamWins, homeTeamLosses}}/>)
            :
            (<Detailed gameID={gameID} gameStatus={gameStatus} scheduledDateTimeUTC={scheduledDateTimeUTC} homeTeamName={homeTeamName} awayTeamName={awayTeamName} close={handleClick}/>)
            }

        </Box>
    )


}
export default GameTile;