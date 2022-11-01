/*
TODO:
- refactor filenames (e.g. dgger -> user, dggers -> users)
- refactor https req paths (e.g. /dggers -> /search (tbd...))

- searching for certain usernames, such as 'destiny', is pretty slow. Indexing only helped so much.
 */
import {
    Paper,
    Box,
    Typography,
    Button,

} from '@material-ui/core';
import {Stack} from '@mui/material';
import React, {Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {styled} from '@mui/material/styles';
import {StyledTextField} from "./styles";
import dotenv from "dotenv";

import * as Yup from 'yup';
import axios from "axios";

dotenv.config();

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    backgroundColor: '#3F4042'
}));

const classes = {
    form: {
        backgroundColor: "#3F4042",
    }
};

export const SearchForm = (props) => {

    const PORT = process.env.REACT_APP_PORT;
    const HOST = process.env.REACT_APP_HOST;
    let URL;
    if (HOST === "localhost") {
        URL = `http://${HOST}:${PORT}`;
    } else {
        URL = `https://${HOST}`;
    }

    const fetchUser = async (data) => {
        const res = await axios.get(`${URL}/dggers/user?username=${data.username}`);
        props.setUsers(res.data);
        res.data.length > 0 && !props.loading
            ? props.setUserFound(true)
            : props.setUserFound(false);
        props.setLoading(false);
    };

    const handleUserSubmit = async (data) => {
        props.setUserFound(null);
        props.setUsers({});
        props.setUsername(String(data.username));
        props.setChannel(String(data.channel));
        props.setSearched(true);
        props.setLoading(true);
        await handleUserDelete(data);
        await handleUserCreate(data);
        await fetchUser(data);
    };

    const handleUserDelete = async (data) => {
        await axios
            .delete(`${URL}/dggers/user?username=${data.username}`)
            .catch((error) => console.error(error.message));
    };

    const handleUserCreate = async (data) => {
        await axios
            .post(`${URL}/dggers/channel/user`, {username: data.username, channel: data.channel})
            .then(() => {
            })
            .catch(() => {
                    props.setLoading(false);
                    props.setUserFound(false);
                });
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        channel: Yup.string()
            .required('Channel is required')
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    return (
        <Fragment>
            <Paper elevation={0}>
                <Box px={3} py={2} style={classes.form}>
                    <Typography variant="h6" align="Left" margin="dense" style={{color: "#e3e3e3", fontWeight: "bold"}}>
                        Search
                    </Typography>

                    <form onSubmit={handleSubmit(handleUserSubmit)} style={classes.form}>
                        <Stack container spacing={1}>
                            <Item item xs={12} sm={6} elevation={0}>
                                <StyledTextField
                                    required
                                    id="username"
                                    name="username"
                                    label="Username"
                                    fullWidth
                                    margin="dense"
                                    control={control}
                                    inputProps={register('username')}
                                    error={!!errors.username}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.username?.message}
                                </Typography>
                            </Item>
                            <Item item xs={12} sm={6} elevation={0}>
                                <StyledTextField
                                    required
                                    id="channel"
                                    name="channel"
                                    label="Channel"
                                    fullWidth
                                    margin="dense"
                                    control={control}
                                    inputProps={register('channel')}
                                    error={!!errors.channel}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.channel?.message}
                                </Typography>
                            </Item>
                        </Stack>

                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                type={"submit"}
                            >
                                Search
                            </Button>
                        </Box>
                    </form>

                </Box>
            </Paper>
        </Fragment>
    );
};

export default SearchForm;