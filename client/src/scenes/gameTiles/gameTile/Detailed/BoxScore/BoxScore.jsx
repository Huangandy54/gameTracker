import { useState } from 'react';
import { Box, Button } from '@mui/material';

import React from 'react';
import BothTeamBoxScore from './BothTeamBoxScore.jsx';
import SingleDetailedBoxScore from './SingleDetailedBoxScore.jsx';

const BoxScore = ({ data }) => {
    const [displayTeam, setDisplayTeam] = useState('both');
    const display = (input) => {
        setDisplayTeam(input);
    };
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    paddingBottom:'.5rem'
                }}
            >
                <Box
                    sx={{
                        width: '40%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant={
                            displayTeam === 'away' ? 'contained' : 'outlined'
                        }
                        onClick={() => display('away')}
                        title={data.awayTeamName}
                    >
                        {data.awayTeamName}
                    </Button>
                </Box>
                <Box
                    sx={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant={
                            displayTeam === 'both' ? 'contained' : 'outlined'
                        }
                        onClick={() => display('both')}
                        title='Both'
                    >
                        Both
                    </Button>
                </Box>
                <Box sx={{
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        variant={
                            displayTeam === 'home' ? 'contained' : 'outlined'
                        }
                        onClick={() => display('home')}
                        sx={{ marginLeft: 'auto'}}
                        title={data.homeTeamName}
                    >
                        {data.homeTeamName}
                    </Button>
                </Box>
            </Box>
            
            {displayTeam==='both'? 
                <BothTeamBoxScore data={data}/>
            : <SingleDetailedBoxScore data={data} team={displayTeam}/>
                
            
        }
            
        </>
    );
};

export default BoxScore;
