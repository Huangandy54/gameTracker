import { useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    useTheme,
    useMediaQuery,
    Icon,
    Container
} from '@mui/material';
import {
    Search,
    DarkMode,
    LightMode,
    Notifications,
    Menu,
    Close,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import UpdateScheduleButton from './updateSchedule';

const NavBar = () => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    
    return (
        

        
        <FlexBetween padding="1rem" backgroundColor={alt}>
            <Container maxWidth='xl' disableGutters={true} sx={{display:'flex', justifyContent: 'space-between'}}>
                {/* Name+Search */}
            <FlexBetween gap="1.75rem" width='50%'>
                {/* Website Name */}
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color="primary"
                    onClick={() => navigate('/')}
                    sx={{
                        '&:hover': {
                            color: primaryLight,
                            cursor: 'pointer',
                        },
                    }}
                >
                    GameTracker
                </Typography>
                {/* display search bar if not mobile */}
                {isNonMobileScreen && (
                    <Box
                        display='flex'
                        justifyContent='space-around'
                        backgroundColor={background}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                        width='100%'
                    >
                        {/* SEARCH BAR */}
                        <InputBase 
                            placeholder="Search..." 
                            fullWidth={true}
                            onKeyDown={(e)=>{
                                if(e.key==='Enter'){
                                    console.log(e.target.value);
                                    alert('Function currently not supported');
                                }
                            }}
                        >
                        </InputBase>
                        {/* SEARCH ICON BUTTON */}
                        <IconButton onClick={()=>{alert('Function currently not supported');}}>
                            <Search />
                        </IconButton>

                    </Box>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreen ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: '25px' }} />
                        )}
                    </IconButton>
                    
                    <UpdateScheduleButton />

                    {/* TODO: NOTIFICATION DROPDOWN
                    <Notifications sx={{ fontSize: '25px' }} 
                    onClick={()=>alert('Tracked games will be implemented')}
                    />
                     */}
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenu(!isMobileMenu)}>
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAV */}
            {!isNonMobileScreen && isMobileMenu && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* Close Icon */}
                    <Box display="flex" justifyContent="flex-end" p="1.25rem 15%">
                        <IconButton
                            onClick={() => setIsMobileMenu(!isMobileMenu)}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    {/* Menu Items */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: '25px' }}>
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode
                                    sx={{ color: dark, fontSize: '25px' }}
                                />
                            )}
                        </IconButton>
                        {/* <Notifications sx={{ fontSize: '25px' }} 
                        onClick={()=>alert('Tracked games will be implemented')}/> */}
                    </FlexBetween>
                </Box>
            )}
        </Container>
    </FlexBetween>
    
    );
};

export default NavBar;
