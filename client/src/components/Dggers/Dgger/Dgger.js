import React from 'react';

export const Dgger = (props) => (
    <tr className="table-row">
        <td className="table-item">
            {props.emote}
        </td>

        <td className="table-item">
            {props.uses}
        </td>
    </tr>
)
