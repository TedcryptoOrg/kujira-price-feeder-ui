import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#161721',
        },
        text: {
            primary: '#fff',
            secondary: '#607d8b',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeightRegular: 400,
        h4: {
            fontSize: '1.125rem',
            color: '#607d8b',
            marginBottom: '.5rem',
        },
        body1: {
            color: '#fff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'Montserrat, sans-serif',
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: 'none',
                    background: 'linear-gradient(45deg, #1e92e6, #60fbd0 75%, #1c6599 150%)',
                    color: '#161721',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    lineHeight: '1em',
                    padding: '.8125rem 1rem',
                    borderRadius: '.25rem',
                    transition: 'all .25s',
                    textDecoration: 'none',
                    position: 'relative',
                    userSelect: 'none',
                    '&:hover': {
                        backgroundPosition: '50% 0',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#607d8b!important',
                },
            },
        },
    },
});

export default theme;
