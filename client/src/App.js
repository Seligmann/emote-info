import React from 'react';
import {
    Container,
    AppBar,
    Typography,
    Grow,
    Grid,
    Divider,
    Box,
    createTheme,
    ThemeProvider,
    Toolbar,
} from '@material-ui/core';

import Dggers from "./components/Dggers/Dggers";
import Form from "./components/Form/Form";
import burself from './images/burself.png';
import useStyles from './styles';
import {CssBaseline} from "@material-ui/core";

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    margin: 0
                }
            }
        }
    }
})

const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>

            <Container maxidth="lg">

                <CssBaseline>
                    <AppBar className={classes.appBar} color="inherit" >
                        <Typography className={classes.heading} variant="h2" align="center">frfr ong</Typography>
                        <img className={classes.image} src={burself} alt="emotes" height="60"/>
                    </AppBar>
                    <Toolbar />
                </CssBaseline>
                <Grow in>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Dggers />
                                <Dggers />
                                <Dggers />
                                <Dggers />
                                <Dggers />
                                <Dggers />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    );
}

export default App;