import React, { useState } from 'react';
import {TextField, Button, Typography, Paper, ThemeProvider} from '@material-ui/core';

import useStyles from './styles';

const Form = () => {
    const [dggerData, setDggerData] = useState({
        username: '', omegalul: 0
    });
    const classes = useStyles();

    const handleSubmit = () => {

    }

    return (
        // <h1>FORM</h1>
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">Search User</Typography>
                <TextField name="username" variant="outlined" label="Username" fullWidth value={dggerData.username} onChange={(e) => setDggerData({ ... dggerData, username: e.target.value })}/>
            </form>
        </Paper>
    );
}

export default Form;