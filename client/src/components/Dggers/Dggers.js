import React from 'react';

import { Dgger } from './Dgger/Dgger';

export const Dggers = (props) => {
    if (props.loading) return <p>Emote profile is being loaded...</p>

    return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Username</th>

            <th className="table-head-item">Emotes</th>

            <th className="table-head-item">Count</th>
          </tr>
        </thead>

        <tbody className='table-body' style={{textAlign: 'center'}}>
            {props.users?.length > 0 ? (
                props.users.map((user) => (
                    <Dgger
                        username={user.username}
                        emote={user.emote}
                        uses={user.uses}
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