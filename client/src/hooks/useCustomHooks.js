import { useDispatch } from "react-redux";
import { setSchedule, updatePastGame } from "state";
import { useState, useEffect } from 'react';

export const useScheduleData = (reqDate) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://game-tracker-dev-api.vercel.app/date/${reqDate}`);
        const data = await response.json();
        data.sort((a, b) => (a.scheduledDateTimeUTC > b.scheduledDateTimeUTC ? 1 : -1));

        //if today's date is schedule's date then remove games that are not needed.
        const today = new Date().toLocaleDateString('en-ca');
        if (reqDate === today) {
          const filteredData = data.filter((obj) => obj.ifNecessary === false);
          dispatch(setSchedule({ schedule: filteredData }));

          filteredData.forEach(async (a) => {
            if (a.gameStatus === 3) {
              try {
                const response = await fetch(`https://game-tracker-dev-api.vercel.app/game/${a.gameID}`);
                const pastGameData = await response.json();
                dispatch(updatePastGame({ gameID: a.gameID, game: pastGameData }));
              } catch (error) {
                console.log(error);
              }
            }
          });
        }
        //if requested date is in the past
        else if (reqDate < today) {
          const filteredData = data.filter((obj) => obj.ifNecessary === false);
          filteredData.forEach(async (a) => {
            try {
              const response = await fetch(`https://game-tracker-dev-api.vercel.app/game/${a.gameID}`);
              const pastGameData = await response.json();
              dispatch(updatePastGame({ gameID: a.gameID, game: pastGameData }));
            } catch (error) {
              console.log(error);
            }
          });
          dispatch(setSchedule({ schedule: filteredData }));
        }
        //future
        else {
          dispatch(setSchedule({ schedule: data }));
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, reqDate]);

  return { isLoading, error };
};