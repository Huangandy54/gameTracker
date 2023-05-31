import { Container, Typography, Box, useTheme } from '@mui/material';
import React from 'react';



const Footer = () => {

    const theme = useTheme();
    const alt = theme.palette.background.alt;
    return (
        <Box sx={{
            backgroundColor: {alt},
            width:'100%',
            position:'absolute',
            bottom: 0 
        }}>
            <Container>
                
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                >
                    &copy; 2023 GameTracker. All rights reserved.
                </Typography>

                <Typography
                    variant="subtitle2"
                    align="center"
                    color="textSecondary"
                >
                    All images and data used on this website are obtained from publicly
                    available sources. If you believe that we have infringed on your rights, please contact us immediately
                    and we will remove the image. We make no claim of ownership
                    of the images or data used on this website unless otherwise stated.
                    All images are used for illustrative purposes only, and no
                    commercial or monetary gain is made by using these images.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
