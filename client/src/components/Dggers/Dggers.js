import React from 'react';
// import { useSelector } from "react-redux";

// import Dgger from './Dgger/Dgger';
import { Dgger } from './Dgger/Dgger';
// import useStyles from './styles';

export const Dggers = (props) => {
    if (props.loading) return <p>Emote use info is being loaded...</p>

    return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Username</th>

            <th className="table-head-item">Emotes</th>

            <th className="table-head-item">Count</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className='table-body'>
            {props.dggers?.length > 0 ? (
                props.dggers.map((dgger) => (
                    <Dgger
                        username={dgger.username}
                        emotes={dgger.emotes}
                        uses={dgger.uses}
                    />
                    )
                )
            ) : (
                <tr className='table-row'>
                    <td className='table-item' style={{textAlign: 'center'}} colSpan={6}>No users to show.</td>
                </tr>
            )
            }
        </tbody>
    </table>

    )
}