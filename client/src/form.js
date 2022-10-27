import {
    Paper,
    Box,
    Typography,
    Button,

} from '@material-ui/core';
import {Stack} from '@mui/material';
import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {styled} from '@mui/material/styles';
import {StyledTextField} from "./styles";

import * as Yup from 'yup';

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

    const onSubmit = data => {
        props.setUsername(data.username);
        props.setChannel(data.channel);
    };

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box px={3} py={2} style={classes.form}>
                    <Typography variant="h6" align="Left" margin="dense" style={{color: "#e3e3e3", fontWeight: "bold"}}>
                        Search
                    </Typography>

                    <Stack container spacing={1}>
                        <Item item xs={12} sm={6} elevation={0}>
                            <StyledTextField
                                required
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                margin="dense"
                                {...register('username')}
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
                                {...register('channel')}
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
                            onClick={handleSubmit(onSubmit)}
                        >
                           Search
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    );
};

export default SearchForm;