import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';

import { getDggers } from './actions/dggers';
import Dggers from "./components/Dggers/Dggers";
import Form from "./components/Form/Form";
import burself from './images/burself.png';
import useStyles from './styles';
import {CssBaseline} from "@material-ui/core";

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDggers());
    }, [dispatch])

    return (
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
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
    );
}

export default App;