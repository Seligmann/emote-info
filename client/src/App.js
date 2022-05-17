import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Dggers from "./components/Dggers/Dggers";
import Form from "./components/Form/Form";
import burself from './images/burself.png';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return (
        <Container maxidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">frfr ong</Typography>
                <img className={classes.image} src={burself} alt="emotes" height="60"/>
            </AppBar>
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