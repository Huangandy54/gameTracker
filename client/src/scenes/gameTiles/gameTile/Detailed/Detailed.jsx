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
    //console.log(`gameID: ${gameID} gameStatus: ${gameStatus}`);
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
                title='Close'
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
                                justifyContent: 'space-between',
                                paddingBottom:'.5rem'
                            }}
                        >
                            <Box
                                sx={{
                                }}
                            >
                                <Button variant={displayTeam === 'away' ? 'contained' : 'outlined'} onClick={()=>displayAway()} title={awayTeamName}>
                                    {awayTeamName}
                                </Button>
                            </Box>
                            <Box sx={{}}>
                                <Button variant={displayTeam === 'home' ? 'contained' : 'outlined'} onClick={()=>displayHome()}title={homeTeamName}>
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
