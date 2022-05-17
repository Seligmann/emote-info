import React from 'react';
import Dgger from './Dgger/Dgger';

import useStyles from './styles';

const Dggers = () => {
    const classes = useStyles();

    return (
        <>
            <h1>DGGERS</h1>
            <Dgger/>
            <Dgger/>
        </>
    );
}

export default Dggers;