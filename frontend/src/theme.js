import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            dark: '#115293',
            light: '#42a5f5',
        },
        secondary: {
            main: '#ffffff',
        },
        background: {
            default: '#f5f7fa',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helevetica", "sans-serif"',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 24px',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            },
        },
    },
});

export default theme;