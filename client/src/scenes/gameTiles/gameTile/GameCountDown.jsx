import { useEffect, useState } from "react";
import { Box,Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addLiveGame } from "state";
import { updateLiveGame } from "state";
const GameCountDown = ({
    startTime,
    gameID
}) =>{
    //helper function to determine remaining time
    const timeCalc = () => {
        return Date.parse(startTime) - Date.parse(new Date());
    }
    const formatTime=(timeRemaining)=>{
        const hours= Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes= Math.floor((timeRemaining / 1000 / 60) % 60);
        return (`${hours} hour ${minutes} minutes`);
    }

    const [countDown, setCountDown] = useState(timeCalc());
    const [isLive, setIsLive] = useState(countDown<0);
    const dispatch = useDispatch();
    const gameData= useSelector((state)=>state.liveGames[gameID]);
    //timer useEffect counts down every minute
    useEffect(() => {
        const timer= setTimeout(() => {
            const newCountDown = timeCalc();
            setCountDown(newCountDown);

            if(newCountDown<=0){
                setIsLive(true);
                clearTimeout(timer);
            }
        }, 60000);
        return () => clearTimeout(timer);
    });
    
    //API call useEffect
    useEffect(()=>{
        if(isLive){
            const fetchLiveData = setInterval(async ()=>{
                console.log('fetching');
                try {
                    const response = await fetch(`https://game-tracker-dev-api.vercel.app/live/${gameID}`);
                    const data = await response.json();
                    dispatch(updateLiveGame({ gameID: gameID, game: data }));
                    if(data.gameStatus===3){
                        clearInterval(fetchLiveData)
                    }
                } catch (error) {
                    console.log(error)
                }
                
            },5000);

            return () => clearInterval(fetchLiveData);
        }
    },[isLive])

    return(
        <div>
            {!isLive ?(countDown < 86400000  && (
                <Typography>
                    Starting in: {formatTime(countDown)}
                </Typography>
            )
            ):(
                <>
                {gameData &&(
                <Typography color='red'>{gameData.gameStatusText}</Typography>)
                }
                </>

                
            )}
        </div>
        
    )
}

export default GameCountDown;