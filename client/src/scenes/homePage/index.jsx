import {
    Box,
    useMediaQuery,
    Container,
    CircularProgress,
    Typography,
} from '@mui/material';
import { dateConvert } from 'Helper/helperFns';
import { useState, useEffect } from 'react';
import NavBar from 'scenes/navbar';
import GameTiles from 'scenes/gameTiles/GameTiles';
import Footer from 'scenes/footer';
import { updatePastGame } from 'state';
import DateSelector from './DateSelector';
import { useDispatch } from 'react-redux';

const HomePage = () => {
    const dispatch = useDispatch();
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
    const [date, setDate] = useState(new Date().toISOString());
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log('Homepage');

    useEffect(() => {
        const reqDate = dateConvert(date);
        setIsLoading(true);
        setError(null);
        const fetchData = async () => {
            console.log('api call');
            try {
                const response = await fetch(
                    `https://game-tracker-dev-api.vercel.app/date/${reqDate}`
                );
                const data = await response.json();
                if (data.length === 0) {
                    setError('No Games Today');
                }
                data.sort((a, b) =>
                    a.scheduledDateTimeUTC > b.scheduledDateTimeUTC ? 1 : -1
                );

                //if today's date is schedule's date then remove games that are not needed.
                const today = new Date().toLocaleDateString('en-ca');
                if (reqDate === today) {
                    const filteredData = data.filter(
                        (obj) => obj.ifNecessary === false
                    );
                    setSchedule(filteredData);

                    filteredData.forEach(async (a) => {
                        if (a.gameStatus === 3) {
                            try {
                                const response = await fetch(
                                    `https://game-tracker-dev-api.vercel.app/game/${a.gameID}`
                                );
                                const pastGameData = await response.json();
                                dispatch(
                                    updatePastGame({
                                        gameID: a.gameID,
                                        game: pastGameData,
                                    })
                                );
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
                }
                //if requested date is in the past
                else if (reqDate < today) {
                    const filteredData = data.filter(
                        (obj) => obj.ifNecessary === false
                    );
                    filteredData.forEach(async (a) => {
                        try {
                            const response = await fetch(
                                `https://game-tracker-dev-api.vercel.app/game/${a.gameID}`
                            );
                            const pastGameData = await response.json();
                            dispatch(
                                updatePastGame({
                                    gameID: a.gameID,
                                    game: pastGameData,
                                })
                            );
                        } catch (error) {
                            console.log(error);
                        }
                    });
                    setSchedule(filteredData);
                }
                //future
                else {
                    setSchedule(data);
                }
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch, date]);

    const changeDate = (newDate) => {
        setDate(newDate);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100%',
                paddingBottom: '5rem',
            }}
        >
            <NavBar />
            <Container
                maxWidth="xl"
                disableGutters={true}
                sx={{ marginTop: '1rem', height: '100%' }}
            >
                {/* DATE SELECTOR */}
                <DateSelector date={date} updateDate={changeDate} />
                {/* Main Content */}
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : error === 'No Games Today' ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '50vh',
                        }}
                    >
                        <Typography variant="h2">NO GAMES TODAY</Typography>
                    </Box>
                ) : error ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '50vh',
                        }}
                    >
                        <Typography variant="h2">
                            Error Fetching Games
                        </Typography>
                    </Box>
                ) : (
                    <GameTiles schedule={schedule} />
                )}
            </Container>
            <Footer />
        </Box>
    );
};

export default HomePage;
