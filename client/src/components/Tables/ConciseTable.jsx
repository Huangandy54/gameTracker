import React from 'react';
import {
    Table,
    TableContainer,
    Typography,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Box,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@emotion/react';

const ConciseTable = ({ rows }) => {
    const cellPadding = '6px 8px 6px 8px';
    const isMobile = useMediaQuery('(max-width: 500px)');
    const calcPercent = (row) => {
        let splitArr = row.split('-');
        const percentage = splitArr[0] / splitArr[1];
        return `${(percentage * 100).toFixed(1)}%`;
    };
    const theme = useTheme();
    const alt = theme.palette.background.cell;
    return (
        <Box
            sx={{
                //border:'1px solid',
                borderRadius: '10px',
            }}
        >
            <TableContainer>
                <Table
                    sx={{
                        width: '100%',
                        '& td, & th': {
                            padding: isMobile
                                ? '4px 6px 4px 6px'
                                : '6px 8px 6px 8px',
                            fontSize: isMobile ? '10px' : '12px',
                        },
                    }}
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Min</TableCell>
                            <TableCell align="right">Pts</TableCell>
                            <TableCell align="right">FG</TableCell>
                            <TableCell align="right">3Pts</TableCell>
                            <TableCell align="right">Reb</TableCell>
                            <TableCell align="right">Ast</TableCell>
                            <TableCell align="right">+/-</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:nth-of-type(odd)": { background: alt }
                                    
                                }}
                            >
                                <TableCell scope="row">
                                    {row.name}
                                    {isMobile ? null : (
                                        <span
                                            style={{
                                                float: 'right',
                                                paddingLeft: '1rem',
                                            }}
                                        >
                                            {row.position} {row.number}{' '}
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell align="right">
                                    {row.minutes}
                                </TableCell>
                                <TableCell align="right">
                                    {row.points}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    title={calcPercent(row.fieldGoals)}
                                    style={{ cursor: 'default' }}
                                >
                                    {row.fieldGoals}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    title={calcPercent(row.fieldGoal3s)}
                                    style={{ cursor: 'default' }}
                                >
                                    {row.fieldGoal3s}
                                </TableCell>
                                <TableCell align="right">
                                    {row.rebounds}
                                </TableCell>
                                <TableCell align="right">
                                    {row.assists}
                                </TableCell>
                                <TableCell align="right">
                                    {row.plusMinus}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ConciseTable;
