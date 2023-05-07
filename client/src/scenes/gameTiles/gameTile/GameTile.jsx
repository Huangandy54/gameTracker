import { Box, useTheme } from "@mui/material";

import {useState } from "react";

import Overview from "./Overview";
import Detailed from "./Detailed";

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
}) => {
    const [flip,setFlip] = useState(false);
    const theme = useTheme();
    const {palette} = useTheme();
    const alt = theme.palette.background.alt;
    console.log(`gameID: ${gameID} gameStatus: ${gameStatus}`);

    return(
        <Box onClick={()=>setFlip(!flip)} sx={{
            
            backgroundColor:alt, 
            display:"flex",
            width:'100%',
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
            (null)
            }

        </Box>
    )


}
export default GameTile;