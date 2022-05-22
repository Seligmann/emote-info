import React from 'react';
import { useSelector } from "react-redux";

import Dgger from './Dgger/Dgger';
import useStyles from './styles';

const Dggers = () => {
    const dggers = useSelector((state) => state.dggers);
    const classes = useStyles();

    console.log(dggers);

    return (
        <>
            <h1>DGGERS</h1>
            <Dgger/>
            <Dgger/>
        </>
    );
}

export default Dggers;