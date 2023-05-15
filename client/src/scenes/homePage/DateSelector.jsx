import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { decrementDate, dateConvert, incrementDate } from 'Helper/helperFns';

const DateSelector = ({
    date,
    updateDate,
}) => {

    return (
        <Box
            id="dateSelect"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography variant="h1">{dateConvert(date)}</Typography>
            </Box>

            {/* PREV and NEXT */}
            <Box>
                <Button
                    onClick={() => {
                        let newDate = decrementDate(date);
                        updateDate(newDate);
                    }}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => {
                        let newDate = incrementDate(date);
                        updateDate(newDate);
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default DateSelector;
