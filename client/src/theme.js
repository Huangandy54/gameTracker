export const colorTokens = {
    gray: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#363638",
      900: "#1C1C1E",
      1000: "#000000",
    },
    primary: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
};

// MUI theme settings
export const themeSettings = (mode) =>{
    return{
        components: {
            MuiTableCell: {
              styleOverrides: {
                root: {
                    // padding:'3px 8px 3px 8px',
                    border: '1px solid',
                    
                }
              },
            },
          },
        breakpoints:{
            values:{
                mobile: 0,
                tablet: 640,
                laptop: 1024,
                desktop: 1500, 
            }
        },
        palette: {
            mode : mode,
            ...(mode ==="dark") ? {
                //dark mode
                primary: {
                    dark: colorTokens.primary[200],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[800]
                },
                neutral: {
                    dark : colorTokens.gray[100],
                    main: colorTokens.gray[200],
                    mediumMain: colorTokens.gray[300],
                    medium: colorTokens.gray[400],
                    light: colorTokens.gray[700]
                },
                background: {
                    default: colorTokens.gray[900],
                    alt : colorTokens.gray[800],
                    cell: colorTokens.gray[600]
                }
            } : {
                //light mode
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[600],
                    light: colorTokens.primary[50]
                },
                neutral: {
                    dark : colorTokens.gray[700],
                    main: colorTokens.gray[500],
                    mediumMain: colorTokens.gray[400],
                    medium: colorTokens.gray[300],
                    light: colorTokens.gray[50]
                },
                background: {
                    default: colorTokens.gray[0],
                    alt : colorTokens.gray[50],
                    cell: colorTokens.primary[50]
                }
            }
        },
        typography:{
            fontFamily: ['Kanit', 'sans-serif'].join(','),
            fontSize: 12,
            h1:{
                fontFamily: ['Kanit', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2:{
                fontFamily: ['Kanit', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3:{
                fontFamily: ['Kanit', 'sans-serif'].join(','),
                fontSize: 24,
            },
            h4:{
                fontFamily: ['Kanit', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h5:{
                fontFamily: ['Kanit', 'sans-serif'].join(','),
                fontSize: 16,
            },
            h6:{
                fontFamily: ['Kanit', 'sans-serif'].join(','),
                fontSize: 14, 
                '@media (max-width:850px)': {
                    fontSize: 10,
                },
            },
            subtitle1:{
                '@media (max-width:850px)': {
                    fontSize: 10,
                },
            },
            subtitle2:{
                '@media (max-width:850px)': {
                    fontSize: 8,
                },
            }
        }
    }
}