import { createTheme } from '@mui/material/styles';

// declare module '@mui/material/styles' {
//     interface PaletteOptions {
//         custom: {
//             white: string;
//             superLightGray: string;
//             superLightPurple: string;
//             gray: string;
//             purple: string;
//             purpleHover: string;
//             teal: string;
//         };
//     }
// }

export const theme = createTheme({
    // palette: {
    //     custom: {
    //         white: '#FAFAFA',
    //         superLightGray: '#efefef00',
    //         superLightPurple: '#cfc2eb33',
    //         gray: '#CECBCB',
    //         purple: '#3E0649',
    //         purpleHover: '#3e0649',
    //         teal: '#388B8B',
    //     },
    // },
    typography: {
        fontFamily: '"Afacad Flux", "Itim", "Playwrite DE Grund", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    maxWidth: '100vw',
                    overflow: 'hidden',
                },
                body: {
                    maxHeight: '100%',
                    fontFamily: '"Afacad Flux", "Itim", "Playwrite DE Grund", sans-serif',
                    backgroundColor: "#cfc2eb33"
                },
                '*': {
                    boxSizing: 'border-box',
                    padding: 0,
                    margin: 0,
                },
                a: {
                    textDecoration: 'none',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    '&.custom-container': {
                        backgroundColor: '#388B8B',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem',
                        height: '80vh',
                        margin: '3rem auto',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        borderRadius: '2rem',
                        '& .container-main': {
                            backgroundColor: '#FAFAFA',
                            padding: '3rem',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            borderRadius: '2rem',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                        },
                        '@media (max-width: 768px)': {
                            width: '90%',
                            padding: '1rem',
                            '& .container-main': {
                                flexDirection: 'column',
                                padding: 0,
                                height: '100%',
                                justifyContent: 'space-around',
                            }
                        }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    fontFamily: '"Afacad Flux", "Itim", "Playwrite DE Grund", sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    textTransform: 'none',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                    },
                },
                contained: {
                    '&.login-button': {
                        padding: '0.5rem 0.8rem',
                        backgroundColor: '#6A2A85',
                        color: '#FAFAFA',
                        fontSize: '1.1rem',
                        '&:hover': {
                            backgroundColor: '#813599',
                            color: '#FAFAFA',
                        },
                    },
                    '&.menu-button': {
                        backgroundColor: '#6A2A85',
                        color: '#FAFAFA',
                        padding: '1.5rem',
                        width: '25rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        whiteSpace: 'nowrap',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        margin: '1rem',
                        '&:hover': {
                            backgroundColor: '#813599',
                            color: '#FAFAFA',
                            '& .MuiSvgIcon-root': {
                                color: '#FAFAFA',
                            },
                        },
                        '@media (max-width: 768px)': {
                            width: '98%',
                            margin: '0.5rem 0',
                            justifyContent: 'center',
                            fontSize: "1.2rem"
                        },
                    },
                    '&.pdf-button': {
                        backgroundColor: '#cfc2eb33',
                        color: '#3E0649',
                        width: '100%',
                        margin: '0.8rem 0',
                        padding: '0.5rem 1.5rem',
                        fontSize: '1.3rem',
                        justifyContent: 'start',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '& .MuiSvgIcon-root': {
                            color: '#388B8B',
                        },
                        '&:hover': {
                            backgroundColor: '#6A2A85',
                            color: '#FAFAFA',
                            '& .MuiSvgIcon-root': {
                                color: '#FAFAFA',
                            },
                        },
                        '@media (max-width: 768px)': {
                            width: '100%',
                        },
                    },
                    '&.basicButton': {
                        padding: '0.8rem 1.5rem',
                        backgroundColor: '#6A2A85',
                        color: '#FAFAFA',
                        fontSize: '1.2rem',
                        '&:hover': {
                            backgroundColor: '#813599',
                            color: '#FAFAFA',
                            '& .MuiSvgIcon-root': {
                                color: '#FAFAFA',
                            },
                        },
                    },
                    '&.backButton': {
                        backgroundColor: '#6A2A85',
                        color: '#FAFAFA',
                        '&:hover': {
                            backgroundColor: '#813599',
                            color: '#FAFAFA',
                        }
                    },
                    '&.upload-pdf-button': {
                        backgroundColor: '#3E0649',
                        color: '#FAFAFA',
                        padding: '0.8rem 1.5rem',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        width: '15rem',
                        margin: '0 auto',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease-in-out',
                        '& .MuiSvgIcon-root': {
                            color: '#388B8B',
                        },
                        '&:hover': {
                            backgroundColor: '#6A2A85',
                            '& .MuiSvgIcon-root': {
                                color: '#FAFAFA',
                            },
                        },
                        '&:disabled': {
                            backgroundColor: '#CCC',
                            color: '#888',
                            cursor: 'not-allowed',
                        },
                    }
                },
            },
        },
    }
});