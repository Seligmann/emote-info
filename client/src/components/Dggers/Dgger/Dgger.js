import React from 'react';
import useStyles from './styles';

export const Dgger = (props) => (
    // const classes = useStyles();

    <tr className="table-row">
        <td className="table-item">
            {props.username}
        </td>

        <td className="table-item">
            {props.emote}
        </td>

        <td className="table-item">
            {props.uses}
        </td>
    </tr>
)
