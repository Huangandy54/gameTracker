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
    let result = [];
    data.forEach((player) => {
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
    return result;
};

export const createDetailedRows = (data) => {
    let result = [];
    data.forEach((player) => {
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
    return result;
};
