import DetailedTable from 'components/Tables/DetailedTable.jsx';
import {
    createDetailedRows
} from '../../../../../components/Tables/helperfn.js';
import {Box} from '@mui/material'


const SingleDetailedBoxScore = ({
    data,
    team,
}) => {
    //console.log(data);
    //console.log(team);
    let rows;
    if (data) {
        if(team==='away'){
            const awayTeam = data.awayTeamPlayers;
            rows = createDetailedRows(awayTeam);
        }else{
            const homeTeam = data.homeTeamPlayers;
            rows = createDetailedRows(homeTeam);
        }
    }
    return (
        <Box
            sx={{
                width:'100%'
            }}
        >
                <DetailedTable rows={rows} />
        </Box>
    );
};

export default SingleDetailedBoxScore;
