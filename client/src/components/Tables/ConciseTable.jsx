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
    useMediaQuery
} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles';
//change padding based on mobile
//sx={{padding: '6px 8px 6px 8px'}}

  
const ConciseTable = ({rows}) => {
    const cellPadding = '6px 8px 6px 8px';
    const isMobile = useMediaQuery('(max-width: 500px)');
    return (
        <Box sx={{
            //border:'1px solid',
            borderRadius:'10px'
        }}>
            <TableContainer>
            <Table
                sx={{
                    width: '100%',
                    '& td, & th' :{
                        padding: isMobile? '4px 6px 4px 6px' : '6px 8px 6px 8px',
                        fontSize: isMobile? '10px' : '12px'
                    }
                }}
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell >Name</TableCell>
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
                                '&:last-child td, &:last-child th': {
                                    
                                },
                            }}
                        >
                            <TableCell scope="row">
                            {row.name}
                            {isMobile?null: <span style={{float:'right', paddingLeft: '1rem'}}>{row.position} {row.number} </span>}
                            </TableCell>
                        
                            <TableCell align="right">{row.minutes}</TableCell>
                            <TableCell align="right">{row.points}</TableCell>
                            <TableCell align="right">{row.fieldGoals}</TableCell>
                            <TableCell align="right">{row.fieldGoal3s}</TableCell>
                            <TableCell align="right">{row.rebounds}</TableCell>
                            <TableCell align="right">{row.assists}</TableCell>
                            <TableCell align="right">{row.plusMinus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default ConciseTable;
