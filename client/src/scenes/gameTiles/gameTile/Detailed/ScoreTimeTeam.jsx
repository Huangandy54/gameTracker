import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import GameCountDown from '../GameCountDown';
import { useSelector } from 'react-redux';

const ScoreTimeTeam = ({
    gameID,
    gameStatus,
    scheduledDateTimeUTC,
    homeTeamName,
    awayTeamName,
}) => {
    const [pastGame, setPastGame] = useState(gameStatus === 3);
    const data = useSelector((state) =>
        gameStatus === 3 ? state.pastGames[gameID] : state.liveGames[gameID]
    );
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                p: '.5rem 0 1rem 0',
            }}
        >
            <Box
                sx={{
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography>{awayTeamName}</Typography>

                {data && <Typography sx={{}}>{data.awayScore}</Typography>}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {pastGame ? (
                    <Typography color="red">FINAL</Typography>
                ) : (data&&
                    <GameCountDown
                    startTime={scheduledDateTimeUTC}
                    gameID={gameID}
                    />
                )}
            </Box>

            <Box
                sx={{
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {data && <Typography sx={{}}>{data.homeScore}</Typography>}
                <Typography sx={{ marginLeft: 'auto' }}>
                    {homeTeamName}
                </Typography>
            </Box>
        </Box>
    );
};

export default ScoreTimeTeam;
