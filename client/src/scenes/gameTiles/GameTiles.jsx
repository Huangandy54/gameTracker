import { Box, useTheme, Grid,useMediaQuery} from "@mui/material";


import GameTile from 'scenes/gameTiles/gameTile/GameTile'




const GameTiles = ({schedule}) =>{
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const medium= palette.neutral.medium;
    const main = palette.neutral.main;
    //console.log(schedule)
    const isMobile = useMediaQuery('(max-width: 1000px)');
    
    return(
        <Box sx={{paddingTop:'25px', paddingBottom:'25px', height:'100%'}}>
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