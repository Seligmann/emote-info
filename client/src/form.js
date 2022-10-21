import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    Button
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const SearchForm = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        channel: Yup.string()
            .required('channel is required')
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };
    return (
        <Fragment>
            <Paper>
                <Box px={3} py={2}>
                    <Typography variant="h6" align="left" margin="dense">
                        Search
                    </Typography>

                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                margin="dense"
                                {...register('username')}
                                error={errors.username ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.username?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="channel"
                                name="channel"
                                label="channel"
                                fullWidth
                                margin="dense"
                                {...register('channel')}
                                error={errors.channel? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.channel?.message}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    );
};

export default SearchForm;