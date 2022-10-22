import {
    Paper,
    Box,
    Typography,
    Button,

} from '@material-ui/core';
import { Stack} from '@mui/material';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import {StyledTextField} from "./styles";

import * as Yup from 'yup';

const Item = styled(Paper)(({ theme }) => ({
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

export const SearchForm = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        channel: Yup.string()
            .required('Channel is required')
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
                <Box px={3} py={2} style={classes.form}>
                    <Typography variant="h6" align="left" margin="dense" style={{color: "#e3e3e3", fontWeight: "bold"}}>
                        Search
                    </Typography>

                    <Stack direction="column" justifyContent={"center"} spacing={2}>
                        <Item elevation={0} xs={12} sm={6}>
                            <StyledTextField
                                input
                                required
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                margin="dense"
                                {...register('username')}
                                error={!!errors.username}

                            />
                            <Typography variant="inherit">
                                {errors.username?.message}
                            </Typography>
                        </Item>
                        <Item elevation={0} xs={12} sm={6}>
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
                            <Typography variant="inherit">
                                {errors.channel?.message}
                            </Typography>
                        </Item>
                    </Stack>

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