import { Box, Typography, useMediaQuery } from "@mui/material";

const TeamImage = ({teamName, teamID, size= '125px', winLoss}) => {
    const isMobileScreen = useMediaQuery('(min-width: 500px)');
    const imageSize = isMobileScreen ? '125px' : '105px'
    const mobilePadding= isMobileScreen ? '10px 10px 0px 10px' : '20px 0px 0px 0px'
    return(
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'flex-start',
            width: imageSize,
            p:mobilePadding
        }}>
            
            <Box sx={{
                height: imageSize,
                display: 'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
                <Box component="img" sx={{
                maxWidth:imageSize,
                maxHeight: imageSize
                //borderRadius:"50%",
                //border: "1px solid black",
                }} 
                src={`https://game-tracker-nba.vercel.app/logos/${teamID}.png`}
                alt={`${teamName} logo`}
                loading='lazy'>
                </Box>
            </Box>
            <Typography align="center" sx={{inlineSize:size}}>{teamName}</Typography>
            <Typography align="center">{winLoss}</Typography>
        </Box>
        
    )
}

export default TeamImage;