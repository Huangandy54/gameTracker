/**
 * column fields
 */
export const columnDetailed = [
    { field: 'playerName', headerName: 'Name', width: 100 },
    { field: 'minutes', headerName: 'Min', width: 25 },
    { field: 'points', headerName: 'Points', width: 25 },
    { field: 'fieldGoals', headerName: 'FG', width: 25 },
    { field: 'fieldGoals3s', headerName: '3PT', width: 25 },
    { field: 'freeThrows', headerName: 'FT', width: 25 },
    { field: 'rebounds', headerName: 'Rebounds', width: 25 },
    { field: 'assists', headerName: 'Assists', width: 25 },
    { field: 'plusMinus', headerName: '+/-', width: 25 },
    { field: 'blocks', headerName: 'BLK', width: 25 },
    { field: 'steals', headerName: 'STL', width: 25 },
    { field: 'turnOvers', headerName: 'TO', width: 25 },
    { field: 'fouls', headerName: 'PF', width: 25 },
];
export const columnConcise = [
    { field: 'playerName', headerName: 'Name', width: 100 },
    { field: 'minutes', headerName: 'Min', width: 25 },
    { field: 'points', headerName: 'Points', width: 25 },
    { field: 'fieldGoals', headerName: 'FG', width: 25 },
    { field: 'fieldGoals3s', headerName: '3PT', width: 25 },
    { field: 'assists', headerName: 'Assists', width: 25 },
    { field: 'plusMinus', headerName: '+/-', width: 25 },
];

/**
 * Helperfn for creating rows
 *
 */

const createConcise = (
    name,
    number,
    position,
    minutes,
    points,
    fieldGoals,
    fieldGoal3s,
    rebounds,
    assists,
    plusMinus
) => {
    return {
        name,
        number,
        position,
        minutes,
        points,
        fieldGoals,
        fieldGoal3s,
        rebounds,
        assists,
        plusMinus,
    };
};

const createDetailed = (
    name,
    number,
    position,
    minutes,
    points,
    fieldGoals,
    fieldGoal3s,
    freeThrows,
    rebounds,
    assists,
    blocks,
    steals,
    turnOvers,
    fouls,
    plusMinus
) => {
    return {
        name,
        number,
        position,
        minutes,
        points,
        fieldGoals,
        fieldGoal3s,
        freeThrows,
        rebounds,
        assists,
        blocks,
        steals,
        turnOvers,
        fouls,
        plusMinus,
    };
};

export const createConciseRows = (data) => {
    let totalFGMade = 0;
    let totalFGAttempts = 0;
    let total3s = 0;
    let total3Attempts = 0;
    let totalReb = 0;
    let totalAssist = 0;
    let result = [];
    data.forEach((player) => {
        totalFGMade += player.fieldGoalsMade;
        totalFGAttempts += player.fieldGoalsAttempts;
        total3s += player.threePointersMade;
        total3Attempts += player.threePointersAttempted;
        totalReb += player.reboundsTotal;
        totalAssist += player.assists;
        result.push(
            createConcise(
                player.name,
                player.jerseyNum,
                player.position || '',
                player.minutes.slice(0, -3),
                player.points,
                `${player.fieldGoalsMade}-${player.fieldGoalsAttempts}`,
                `${player.threePointersMade}-${player.threePointersAttempted}`,
                player.reboundsTotal,
                player.assists,
                player.plusMinusPoints
            )
        );
    });
    result.push({
        name: 'Team Total',
        fieldGoals: `${totalFGMade}-${totalFGAttempts}`,
        fieldGoal3s: `${total3s}-${total3Attempts}`,
        rebounds: totalReb,
        assists: totalAssist,
    });
    return result;
};

export const createDetailedRows = (data) => {
    let totalFGMade = 0;
    let totalFGAttempts = 0;
    let total3s = 0;
    let total3Attempts = 0;
    let totalFTMade = 0;
    let totalFTAttempts = 0;
    let totalReb = 0;
    let totalAssist = 0;
    let totalTO = 0;
    let result = [];
    data.forEach((player) => {
        totalFGMade += player.fieldGoalsMade;
        totalFGAttempts += player.fieldGoalsAttempts;
        total3s += player.threePointersMade;
        total3Attempts += player.threePointersAttempted;
        totalFTMade += player.freeThrowsMade;
        totalFTAttempts += player.freeThrowsAttempted;
        totalReb += player.reboundsTotal;
        totalAssist += player.assists;
        totalTO += player.turnovers;
        result.push(
            createDetailed(
                player.name,
                player.jerseyNum,
                player.position || '',
                player.minutes.slice(0, -3),
                player.points,
                `${player.fieldGoalsMade}-${player.fieldGoalsAttempts}`,
                `${player.threePointersMade}-${player.threePointersAttempted}`,
                `${player.freeThrowsMade}-${player.freeThrowsAttempted}`,
                player.reboundsTotal,
                player.assists,
                player.blocks,
                player.steals,
                player.turnovers,
                player.personalFouls,
                player.plusMinusPoints
            )
        );
    });
    result.push({
        name: 'Team Total',
        fieldGoals: `${totalFGMade}-${totalFGAttempts}`,
        fieldGoal3s: `${total3s}-${total3Attempts}`,
        freeThrows: `${totalFTMade}-${totalFTAttempts}`,
        rebounds: totalReb,
        assists: totalAssist,
        turnOvers : totalTO
    });
    return result;
};
