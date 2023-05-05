import { useState } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import { IconButton, Box, Tooltip,  } from '@mui/material';

const UpdateScheduleButton = ()=>{
    const [buttonColor, setButtonColor] = useState('default');

    async function getUpdate(){
        setButtonColor('warning');
        try {
            const response = await fetch('https://game-tracker-dev-api.vercel.app/dev/updateSchedule');
                if(response.status===200){
                setButtonColor('success');
                alert('schedule has been updated');
            }else{
                setButtonColor('error');
                alert(`Error updating schedule`);
            }
        } catch (error) {
            setButtonColor('error');
            alert(`Error updating schedule: ${error.message}`);
        }
    }

    return (
        
        <Box>
            <Tooltip title='Update Game Schedule' arrow>
                <IconButton onClick={() => getUpdate()} color={buttonColor}>
                    <UpdateIcon sx={{fontSize:'25px'}}/>
                </IconButton>
            </Tooltip>
            
        </Box>
        
    )
}

export default UpdateScheduleButton;