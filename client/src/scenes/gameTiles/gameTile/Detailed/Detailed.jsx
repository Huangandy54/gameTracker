import {
    Box,
    Typography,
    IconButton,
    useMediaQuery,
    Button,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import BoxScore from './BoxScore/BoxScore';
import ScoreTimeTeam from './ScoreTimeTeam';
import CloseIcon from '@mui/icons-material/Close';
import SingleTeamBoxScore from './BoxScore/SingleTeamBoxScore';


const Detailed = ({
    gameID,
    gameStatus,
    scheduledDateTimeUTC,
    homeTeamName,
    awayTeamName,
    close,
}) => {
    console.log(`gameID: ${gameID} gameStatus: ${gameStatus}`);
    const data = useSelector((state) =>
        gameStatus === 3 ? state.pastGames[gameID] : state.liveGames[gameID]
    );
    const [displayTeam, setDisplayTeam] = useState('away');
    const isLargeScreen = useMediaQuery('(min-width: 915px)');
    const displayHome = () => {
        setDisplayTeam('home');
    };
    const displayAway = () => {
        setDisplayTeam('away');
    };
    const handleGridClick = (event) => {
        event.stopPropagation();
        // Handle DataGrid click event here
    };
    return (
        <Box
            onClick={handleGridClick}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                minWidth: '100%',
            }}
        >
            <IconButton
                onClick={() => close()}
                style={{
                    marginLeft: '98%',
                }}
            >
                <CloseIcon />
            </IconButton>

            <ScoreTimeTeam
                gameID={gameID}
                gameStatus={gameStatus}
                scheduledDateTimeUTC={scheduledDateTimeUTC}
                homeTeamName={homeTeamName}
                awayTeamName={awayTeamName}
            />
            {data ? (
                isLargeScreen ? (
                    <BoxScore data={data} />
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '50%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    paddingBottom:'.5rem'
                                }}
                            >
                                <Button variant={displayTeam === 'away' ? 'contained' : 'outlined'} onClick={()=>displayAway()}>
                                    {awayTeamName}
                                </Button>
                            </Box>
                            <Box sx={{ width: '50%', marginLeft:'10px'}}>
                                <Button variant={displayTeam === 'home' ? 'contained' : 'outlined'} onClick={()=>displayHome()}>
                                    {homeTeamName}
                                </Button>
                            </Box>
                        </Box>
                        <SingleTeamBoxScore displayTeam={displayTeam} data={data} />
                        
                    </>
                )
            ) : null}
        </Box>
    );
};

export default Detailed;
