import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { decrementDate, dateConvert, incrementDate } from 'Helper/helperFns';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ButtonField(props) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    return (
        <Button
            variant="outlined"
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            onClick={() => setOpen?.((prev) => !prev)}
        >
            {label ?? 'Pick a date'}
        </Button>
    );
}

ButtonField.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    inputProps: PropTypes.shape({
        'aria-label': PropTypes.string,
    }),
    InputProps: PropTypes.shape({
        endAdornment: PropTypes.node,
        startAdornment: PropTypes.node,
    }),
    label: PropTypes.node,
    setOpen: PropTypes.func,
};

function ButtonDatePicker(props) {
    const [open, setOpen] = React.useState(false);

    return (
        <DatePicker
            slots={{ field: ButtonField, ...props.slots }}
            slotProps={{ field: { setOpen } }}
            {...props}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        />
    );
}

ButtonDatePicker.propTypes = {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots: PropTypes.any,
};
const DateSelector = ({ date, updateDate }) => {
    return (
        <Box
            id="dateSelect"
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <IconButton
                edge="start"
                color="primary"
                onClick={() => {
                    let newDate = decrementDate(date);
                    updateDate(newDate);
                }}
                sx={{paddingRight:'2px'}}
                aria-label="Previous Date"
                title="Previous Date"
            >
                <ArrowBackIosIcon />
            </IconButton>
            <ButtonDatePicker
                label={
                    <Typography variant="h4">
                        {dayjs(date).format('MM/DD/YYYY')}
                    </Typography>
                }
                value={dayjs(date)}
                onChange={(newValue) => updateDate(newValue)}
                aria-label="Select Date"
                title="Select Date"
            />
            <IconButton
                edge="end"
                color="primary"
                onClick={() => {
                    let newDate = incrementDate(date);
                    updateDate(newDate);
                }}
                aria-label="Next Date"
                title="Next Date"
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default DateSelector;
