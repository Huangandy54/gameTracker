import {

    createConciseRows,
} from '../../../../../components/Tables/helperfn.js';
import {Box} from '@mui/material'
import ConciseTable from 'components/Tables/ConciseTable';

const BothTeamBoxScore = ({
    data
}) => {
    let homeRows;
    let awayRows;
    //console.log(data)
    if (data) {
        const homeTeam = data.homeTeamPlayers;
        const awayTeam = data.awayTeamPlayers;

        homeRows = createConciseRows(homeTeam);
        awayRows = createConciseRows(awayTeam);
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '20px',
            }}
        >
            <Box sx={{}}>
                <ConciseTable rows={awayRows} />
            </Box>
            <Box sx={{}}>
                <ConciseTable rows={homeRows} />
            </Box>
        </Box>
    );
};

export default BothTeamBoxScore;
