import { Box, Typography, Divider, useTheme, Grid } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSchedule, updatePastGame } from "state";
import GameTile from 'scenes/gameTiles/gameTile/GameTile'

const GameTiles = ({reqDate}) =>{
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const medium= palette.neutral.medium;
    const main = palette.neutral.main;
    
    const navigate= useNavigate();
    const dispatch = useDispatch();
    //let reqDate= useSelector((state)=>state.date);
    const schedule= useSelector((state)=>state.schedule);
    console.log(reqDate);
    
    const getGames = async(reqDate)=>{
        //const reqDateObj= new Date(reqDate)
        const response= await fetch(`https://game-tracker-dev-api.vercel.app/date/${reqDate}`);
        const data= await response.json();
        data.sort((a,b)=>a.scheduledDateTimeUTC >b.scheduledDateTimeUTC ? 1: -1);
        //if today's date is schedule's date then remove games that are not needed.
        const today = new Date().toLocaleDateString('en-ca');
        if(reqDate===today){
            const filteredData=data.filter(obj=>obj.ifNecessary===false);
            dispatch(setSchedule({schedule: filteredData}));
            filteredData.map(async (a)=>{
                if(a.gameStatus===3){
                    try {
                        const response= await fetch(`https://game-tracker-dev-api.vercel.app/game/${a.gameID}`);
                        const pastGameData= await response.json();
                        dispatch(updatePastGame({gameID: a.gameID, game: pastGameData}));
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        }
        //if requested date is in the past 
        else if(reqDate<today){
            const filteredData=data.filter(obj=>obj.ifNecessary===false);
            filteredData.map(async (a)=>{
                try {
                    const response= await fetch(`https://game-tracker-dev-api.vercel.app/game/${a.gameID}`);
                    const pastGameData= await response.json();
                    dispatch(updatePastGame({gameID: a.gameID, game: pastGameData}));
                } catch (error) {
                    console.log(error)
                }
            })
            dispatch(setSchedule({schedule: filteredData}));
        }
        //future
        else{
            dispatch(setSchedule({schedule: data}));
        }
    }

    useEffect(() => {
        getGames(reqDate);
    }, [reqDate]) // eslint-disable-line react-hooks/exhaustive-deps


    return(
        <Box sx={{paddingTop:'25px', paddingBottom:'25px'}}>
            <Grid 
                container
                direction='row'
                justifyContent='space-around'
                alignItems='center'
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
                        desktop={4}
                        laptop={6}
                        tablet={12}
                        mobile={12}
                        key={_id}
                        >
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
                    </Grid>
                )
                    )}
            </Grid>
            

        </Box>
    )
}


export default GameTiles;