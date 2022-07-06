import { usePreviousProps } from '@mui/utils';
import React from 'react';

export const Dgger = (props) => {
    if (props.loading) return <p>Loading... (it can take up to 50 seconds to get emote statistics if the username hasn't been searched before)</p>

    return ( 
        <tr className="table-row">
            {/* <td className="table-item">
                {props.username}
            </td> */}

            <td className="table-item">
                {props.emote}
            </td>

            <td className="table-item">
                {props.uses}
            </td>
        </tr>
        )
}
