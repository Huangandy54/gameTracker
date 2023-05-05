import { Box, Grid, Spacing, Paper, useMediaQuery, Container, Button,Typography } from "@mui/material";
import { dateConvert, decrementDate, incrementDate } from "Helper/helperFns";
import FlexBetween from "components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "scenes/navbar";
import GameTiles from "scenes/gameTiles/GameTiles";
import {setDate} from "state";
import Footer from "scenes/footer";

const HomePage = () => {
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
    const dispatch = useDispatch();
    const date = useSelector((state) => {
        if(state.date){
            //console.log('exist')
            return state.date;
        }else{
            let dateToday=new Date().toLocaleDateString('en-CA');
            dispatch(setDate(dateToday));
            return dateToday;
        }
    }) 




    return(
        <Box>
            <NavBar/>
            <Container maxWidth='xl' disableGutters={true} sx={{marginTop:'1rem'}}>
                
                {/* DATE SELECTOR */}
                <Box id='dateSelect' sx={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <Box>
                        <Typography variant="h1">{dateConvert(date)}</Typography>
                    </Box>

                    {/* PREV and NEXT */}
                    <Box>
                        <Button onClick={() => {
                            let newDate=decrementDate(date);
                            dispatch(setDate({date: newDate}))}}>
                                Previous
                        </Button>
                        <Button onClick={() => {
                            let newDate=incrementDate(date);
                            dispatch(setDate({date: newDate}))}}>
                                Next
                        </Button>
                    </Box>
                    
                    
                    
                </Box>
                







                <GameTiles reqDate={dateConvert(date)}/>

            </Container>
            <Footer />
        </Box>
        
    );

}

export default HomePage;