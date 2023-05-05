import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ScoreBoard = ({
    gameID,
    pastGame,
}) =>{
    const gameData= useSelector((state)=>
    pastGame? 
        state.pastGames[gameID]
        :
        state.liveGames[gameID]);

    
    return(
        <Box sx={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            paddingBottom:'40px',
            
        }}>
               <Box sx={{
                width:'40%'
               }}>
                    <Typography variant="h1">{gameData.awayScore}</Typography>
                </Box>

                <Box sx={{
                width:'auto'
                
               }}>
                    <Typography variant="h1">-</Typography>
                </Box>

                <Box sx={{
                width:'40%'
               }}>
                    <Typography variant="h1" textAlign='right'>{gameData.homeScore}</Typography>
                </Box>
        </Box>
    )
}

export default ScoreBoard