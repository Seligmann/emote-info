import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import burself from './images/burself.png';
const App = () => {
    return (
        <Container maxidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">frfr ong</Typography>
                <img src={burself} alt="emotes" height="60"/>
            </AppBar>

        </Container>
    )
}

export default App;