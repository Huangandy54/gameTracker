import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateLiveGame } from "state";

export const useLiveGames = (gameID) => {
  const liveGames = useSelector((state) => state.liveGames);
  return liveGames.hasOwnProperty(gameID);
};

export const useLiveGameUpdate= (gameID) =>{
    const liveGames = useSelector((state) => state.liveGames);
    console.log(liveGames);
    console.log('get live game');
    const dispatch = useDispatch();
    useEffect(() => {
        let intervalId;
        
        const fetchLiveData = async () => {
            if(liveGames.hasOwnProperty(gameID)){
                console.log('fetching')
                try {
                    const response = await fetch(`https://game-tracker-dev-api.vercel.app/game/${gameID}`);
                    const data = await response.json();
                    console.log(data);
                    dispatch(updateLiveGame({ gameID: gameID, game: data }));
                  } catch (error) {
                    console.error(error);
                  }
            }
        };
    
        // Call the API every 5 seconds
        
        intervalId = setInterval(fetchLiveData, 5000);
               
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [gameID,liveGames,dispatch]);

}