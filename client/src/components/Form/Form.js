import React, { useState } from 'react';
import {TextField, Button, Typography, Paper } from '@material-ui/core';

import { useDispatch } from "react-redux";

import useStyles from './styles';
import { createDgger } from "../../actions/dggers";

const Form = () => {

    const [dggerData, setDggerData] = useState({
        username: ''
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createDgger(dggerData));
        // dispatch(updateDgger(dggerData));
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Search User</Typography>
                <TextField name="username" variant="outlined" label="Username" fullWidth value={dggerData.username} onChange={(e) => setDggerData({ ... dggerData, username: e.target.value })}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            </form>
        </Paper>
    );
}

export default Form;
