import { Box, Typography, Divider, useTheme, Grid,useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameTile from 'scenes/gameTiles/gameTile/GameTile'
import { useScheduleData } from "hooks/useCustomHooks";




const GameTiles = ({reqDate}) =>{
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const medium= palette.neutral.medium;
    const main = palette.neutral.main;
    //TODO: add loading screen
    const { isLoading, error } = useScheduleData(reqDate);
    const navigate= useNavigate();
    const isMobile = useMediaQuery('(max-width: 1000px)');
    const schedule= useSelector((state)=>state.schedule);
    console.log(reqDate);


    return(
        <Box sx={{paddingTop:'25px', paddingBottom:'25px'}}>
            <Grid 
                container
                direction='row'
                justifyContent='space-around'
                alignItems='flex-start'
                spacing={2}>
                    {schedule.map(
                ({
                    _id,
                    gameID,
                    gameStatus,
                    gameDate,
                    scheduledDateTimeUTC,
                    ifNecessary,
                    seriesGameNumber,
                    seriesText,
                    homeTeam,
                    homeTeamName,
                    homeTeamWins,
                    homeTeamLosses,
                    awayTeam,
                    awayTeamName,
                    awayTeamWins,
                    awayTeamLosses,
                })=>(
                    // each tile settings
                    <Grid item 
                        desktop='auto'
                        laptop='auto'
                        tablet={12}
                        mobile={12}
                        key={_id}
                        sx={{
                            transition: 'width 0.3s ease-in-out',
                        }}
                        >
                        <div style={{
                            minWidth: !isMobile ? '500px' : 'auto',
                            
                        }}>
                            <GameTile
                                gameID={gameID}
                                gameStatus={gameStatus}
                                gameDate={gameDate}
                                scheduledDateTimeUTC={scheduledDateTimeUTC}
                                ifNecessary={ifNecessary}
                                seriesGameNumber={seriesGameNumber}
                                seriesText={seriesText}
                                homeTeam={homeTeam}
                                homeTeamName={homeTeamName}
                                homeTeamWins= {homeTeamWins}
                                homeTeamLosses= {homeTeamLosses}
                                awayTeam={awayTeam}
                                awayTeamName={awayTeamName}
                                awayTeamWins= {awayTeamWins}
                                awayTeamLosses= {awayTeamLosses}
                            />
                        </div>
                        
                    </Grid>
                )
                    )}
            </Grid>
            

        </Box>
    )
}


export default GameTiles;