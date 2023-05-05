import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import useStyles from "./styles";

import logo from "../../../Images/logo.svg"

const timeComparison = (startTime) =>{
    let currentTime=new Date();
    //console.log(`starttime: ${startTime} currentTime: ${currentTime}`)
    if (startTime>currentTime) {
        setTimeout(() => {
            timeComparison();
        }, startTime-currentTime);
    }else{
        /**
         * game is live
         * get data from livegame
         */
    }
}


const Post = ({ post }) => {
    const classes = useStyles();
    console.log(post)
    const dateConverted = new Date(post.scheduledDateTimeUTC).toLocaleTimeString("en-us",{hour:'numeric',minute:'2-digit'});
    timeComparison(new Date(post.scheduledDateTimeUTC));

  return (
    <Card className={classes.Card}>
        <div ><p className={classes.timeText}>{dateConverted}</p></div>
        <Grid container
        justifyContent="space-evenly"
        alignItems="center"
        spacing={0}>
        </Grid>
        <Grid container
        justifyContent="space-evenly"
        alignItems="stretch"
        spacing={1}>
            <Grid item><div className={classes.teamText}>{post.awayTeamName}</div></Grid>
            <Grid item></Grid>
            <Grid item><div className={classes.teamText}>{post.homeTeamName}</div></Grid>

        </Grid>
    </Card>

  );
}

export default Post;
{/* <Grid item className={classes.teamLogo}>
<div border-radius="50%" border="3px solid black" padding= "20px"><p>2</p></div> 
<img className={classes.logoImg} src={logo} alt="team Logo"/>
</Grid>
<Grid item>
<p position="relative" top="20px">@</p>
</Grid>
<Grid item className={classes.teamLogo}>
<img className={classes.logoImg} src={logo} alt="team Logo"/>
</Grid>
</Grid> */}