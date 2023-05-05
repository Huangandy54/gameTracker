import { Box, Typography } from "@mui/material";
import { useState } from "react";
import GameCountDown from "./GameCountDown";
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {field: 'playerName', headerName: 'Name', width: 70},
    {field: 'id', headerName: 'ID', width: 25},
    {field: 'id', headerName: 'ID', width: 25},
    {field: 'id', headerName: 'ID', width: 25},
    {field: 'id', headerName: 'ID', width: 25},
    {field: 'id', headerName: 'ID', width: 25},
]
const rows=[
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 }
]


const Detailed = ({
    gameID,
    gameStatus,
    scheduledDateTimeUTC,
    homeTeam,
    homeTeamName,
    awayTeam,
    awayTeamName,
}) => {
    const [pastGame, setPastGame] = useState(gameStatus===3);
    const data= useSelector((state) => 
    gameStatus===3 ? 
        state.pastGames[gameID] 
        : 
        state.liveGames[gameID]); 

    console.log(data);
    const handleGridClick = (event) => {
        event.stopPropagation();
        // Handle DataGrid click event here
    };
    return (
        <Box onClick={handleGridClick}>
        {pastGame&&(<Typography color='red'>FINAL</Typography>)}
        {pastGame===false&&(<GameCountDown startTime={scheduledDateTimeUTC} gameID={gameID}/>)}
        <Box sx={{
            display:'flex'
        }}>
        <DataGrid 
            rows={rows}
            columns={columns}
            hideFooter='true'
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            columnMenuSortAscendingIcon={null}
            columnMenuSortDescendingIcon={null}
            columnSortedAscendingIcon={null}
            columnSortedDescendingIcon={null}
            sx={{ '& .MuiDataGrid-columnSeparator': { display: 'none', } }} 
        />
        <DataGrid 
            rows={rows}
            columns={columns}
            hideFooter='true'
        />
        </Box>
        
        
        </Box>
    )

};

export default Detailed;
