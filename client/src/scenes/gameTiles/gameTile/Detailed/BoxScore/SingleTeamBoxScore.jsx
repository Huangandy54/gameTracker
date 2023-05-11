import ConciseTable from "../../../../../components/Tables/ConciseTable"
import { createConciseRows } from "../../../../../components/Tables/helperfn";
const SingleTeamBoxScore = ({
    displayTeam,
    data
}) => {
    let homeRows;
    let awayRows;
    
    if (data) {

        const homeTeam = data.homeTeamPlayers;
        const awayTeam = data.awayTeamPlayers;

        homeRows = createConciseRows(homeTeam);
        awayRows = createConciseRows(awayTeam);
        
    }
  return (
    
    <>
    {displayTeam === 'home' && (
        <ConciseTable rows={homeRows} />
    )}
    {displayTeam === 'away' && (
        <ConciseTable rows={awayRows} />
    )}
    </>
  
  ) 
}

export default SingleTeamBoxScore